import { UpgradeVariable } from "../services/VariableStore";
import UpgradeComponent from "./Upgrade.component";

interface UpgradeListProps {
    upgrades: UpgradeVariable[];
}

const UpgradeListComponent: React.FC<UpgradeListProps> = ({ upgrades }) => {
    return (
        <div>
            {upgrades.map((upgrade, idx) => {
                return <UpgradeComponent key={idx} upgrade={upgrade} />;
            })}
        </div>
    );
};

export default UpgradeListComponent;
