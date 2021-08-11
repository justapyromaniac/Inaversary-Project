import { SubscriptionsOutlined } from "@material-ui/icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import ActiveGeneratorService from "../services/ActiveGeneratorService";
import PassiveGeneratorService from "../services/PassiveGeneratorService";
import {Upgrade} from "../services/Upgrade";
import VariableStore, { UpdateObserver } from "../services/VariableStore";

const UpgradeComponent: React.FC<Upgrade> = (upgrade: Upgrade) =>  {
    // TODO: have purchase functionality actually do something
    const [purchased, setPurchased] = useState(false)
    const generatorService = VariableStore.getGeneratorService(upgrade.generatorName);
    const [upgradeAvailable, setUpgradeAvailable] = useState(true);

    const onUpdate: UpdateObserver = (resourceName: string, resourceValue: number) => {
        if(_.isEqual(upgrade.resourceName, resourceName))
            setUpgradeAvailable(upgrade.upgradePrice > resourceValue);
    }

    const purchaseUpgrade = () =>{
        if(!purchased){
            generatorService.purchaseUpgrade(upgrade.valueMultiplier, upgrade.upgradePrice);

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
            {upgrade.upgradeName}
            <div>
                Boost the effect of {upgrade.generatorName} by {upgrade.valueMultiplier}x!
            </div>
            {purchased ? (
                <button disabled={true}>Purchased</button>
            ) : (
                <>
                    <div>
                        Cost: {upgrade.upgradePrice} {upgrade.resourceName}
                    </div>
                    <button disabled={upgradeAvailable} onClick={purchaseUpgrade}>Purchase</button>
                </>
            )}
        </div>
    );
};

export default UpgradeComponent;
