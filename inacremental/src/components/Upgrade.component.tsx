import { SubscriptionsOutlined } from "@material-ui/icons";
import { useState } from "react";
import ActiveGeneratorService from "../services/ActiveGeneratorService";
import PassiveGeneratorService from "../services/PassiveGeneratorService";
import {Upgrade} from "../services/Upgrade";
import VariableStore from "../services/VariableStore";
import ActiveGeneratorUpgradeComponent from "./ActiveGeneratorUpgrade.component";

interface UpgradeProps {
    upgrade: Upgrade;
}

const UpgradeComponent: React.FC<UpgradeProps> = ({ upgrade }) => {
    // TODO: have purchase functionality actually do something
    const [purchased, setPurchased] = useState(false)
    const generator = VariableStore.getGeneratorService(upgrade.generatorName);

    const purchaseUpgrade = () => {
        generator.purchaseUpgrade(upgrade.valueMultiplier);
    }

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
                    <button onClick={purchaseUpgrade}>Purchase</button>
                </>
            )}
        </div>
    );
};

export default UpgradeComponent;
