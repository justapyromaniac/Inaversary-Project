import { useState } from "react";
import {
    ActiveGeneratorUpgrade,
    Upgrade
} from "../services/Upgrade";
import ActiveGeneratorUpgradeComponent from "./ActiveGeneratorUpgrade.component";

interface UpgradeProps {
    upgrade: Upgrade;
}

const UpgradeComponent: React.FC<UpgradeProps> = ({ upgrade }) => {
    // TODO: have purchase functionality actually do something
    const [purchased, setPurchased] = useState(false)

    return (
        <div>
            {upgrade.name}
            {upgrade.type === "active" && (
                <ActiveGeneratorUpgradeComponent
                    upgrade={upgrade as ActiveGeneratorUpgrade}
                />
            )}
            {purchased ? (
                <button disabled={true}>Purchased</button>
            ) : (
                <>
                    <div>
                        Cost: {upgrade.purchasePrice} {upgrade.purchaseResourceName}
                    </div>
                    <button onClick={() => setPurchased(true)}>Purchase</button>
                </>
            )}
        </div>
    );
};

export default UpgradeComponent;
