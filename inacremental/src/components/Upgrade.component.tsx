import {
    ActiveGeneratorUpgradeVariable,
    UpgradeVariable,
} from "../services/VariableStore";
import ActiveGeneratorUpgradeComponent from "./ActiveGeneratorUpgrade.component";

interface UpgradeProps {
    upgrade: UpgradeVariable;
}

const UpgradeComponent: React.FC<UpgradeProps> = ({ upgrade }) => {
    return (
        <div>
            {upgrade.name}
            {upgrade.type === "active" && (
                <ActiveGeneratorUpgradeComponent
                    upgrade={upgrade as ActiveGeneratorUpgradeVariable}
                />
            )}
            {true ? (
                <>
                    <div>
                        Cost: {upgrade.purchasePrice}{" "}
                        {upgrade.purchaseResourceName}
                    </div>
                    <button>Purchase</button>
                </>
            ) : (
                <button disabled={true}>Purchased</button>
            )}
        </div>
    );
};

export default UpgradeComponent;
