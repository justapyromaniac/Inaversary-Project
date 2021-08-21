import { Button } from "@material-ui/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Upgrade } from "../services/Upgrade";
import VariableStore, { UpdateObserver } from "../services/VariableStore";
import { Generator } from '../services/Generator';

interface UpgradeComponentProps {
    upgrade: Upgrade,
    generator: Generator
}

const UpgradeComponent: React.FC<UpgradeComponentProps> = ({upgrade, generator}) =>  {
    // TODO: have purchase functionality actually do something
    const [purchased, setPurchased] = useState(false);
    const generatorService = VariableStore.getGeneratorService(generator.generatorName);
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
                
            </div>
            {purchased ? (
                <Button disabled={true}>Purchased</Button>
            ) : (
                <>
                    <div>
                        Cost: {upgrade.upgradePrice} {upgrade.resourceName}
                    </div>
                    <Button disabled={upgradeAvailable} onClick={purchaseUpgrade}>Purchase</Button>
                </>
            )}
        </div>
    );
};

export default UpgradeComponent;
