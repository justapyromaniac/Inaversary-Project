import { ActiveGeneratorUpgrade } from "../services/Upgrade";

interface ActiveGeneratorUpgradeProps {
  upgrade: ActiveGeneratorUpgrade;
}

const ActiveGeneratorUpgradeComponent: React.FC<ActiveGeneratorUpgradeProps> =
  ({ upgrade }) => {
    return (
      <div>
        Boost the effect of {upgrade.generatorName} by {upgrade.valueMultiplier}x!
      </div>
    );
  };

export default ActiveGeneratorUpgradeComponent;
