import { SubscriptionsOutlined } from "@material-ui/icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import ActiveGeneratorService from "../services/ActiveGeneratorService";
import PassiveGeneratorService from "../services/PassiveGeneratorService";
import {Upgrade} from "../services/Upgrade";
import VariableStore, { UpdateObserver } from "../services/VariableStore";
import ActiveGeneratorUpgradeComponent from "./ActiveGeneratorUpgrade.component";

interface UpgradeProps {
    upgrade: Upgrade;
}

const UpgradeComponent: React.FC<UpgradeProps> = ({ upgrade }) => {
    // TODO: have purchase functionality actually do something
    const [purchased, setPurchased] = useState(false)
    const generatorService = VariableStore.getGeneratorService(upgrade.generatorName);
    const [upgradeAvailable, setUpgradeAvailable] = useState(true);

    const onUpdate: UpdateObserver = (resourceName: string, resourceValue: number) => {
        if(_.isEqual(upgrade.purchaseResourceName, resourceName))
            setUpgradeAvailable(upgrade.purchasePrice > resourceValue);
    }

    const purchaseUpgrade = () =>{
        if(!purchased){
            if(upgrade.type === 'active'){
                (generatorService as ActiveGeneratorService).purchaseUpgrade(upgrade.valueMultiplier, upgrade.purchasePrice);
            }else{
                (generatorService as PassiveGeneratorService).purchaseUpgrade(upgrade.valueMultiplier, upgrade.purchasePrice);
            }

            setPurchased(true);
        }
    }

    useEffect(() => {
        VariableStore.registerObserver(onUpdate);

        return () => VariableStore.removeObserver(onUpdate);
    })

    return (
        <div>
            <br/>
            {upgrade.name}
            {upgrade.type === "active" && (
                <ActiveGeneratorUpgradeComponent
                    upgrade={upgrade}
                />
            )}
            {purchased ? (
                <button disabled={true}>Purchased</button>
            ) : (
                <>
                    <div>
                        Cost: {upgrade.purchasePrice} {upgrade.purchaseResourceName}
                    </div>
                    <button disabled={upgradeAvailable} onClick={purchaseUpgrade}>Purchase</button>
                </>
            )}
        </div>
    );
};

export default UpgradeComponent;
