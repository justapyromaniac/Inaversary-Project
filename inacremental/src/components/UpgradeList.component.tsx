import { Upgrade } from "../services/Upgrade";
import UpgradeComponent from "./Upgrade.component";

interface UpgradeListProps {
    upgrades: Upgrade[];
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
