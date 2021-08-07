import { ActiveGeneratorUpgradeVariable } from "../services/VariableStore";

interface ActiveGeneratorUpgradeProps {
  upgrade: ActiveGeneratorUpgradeVariable;
}

const ActiveGeneratorUpgradeComponent: React.FC<ActiveGeneratorUpgradeProps> =
  ({ upgrade }) => {
    return (
      <div>
        Boost the effect of {upgrade.generatorName} by {upgrade.valueMultiplier}
        x!
      </div>
    );
  };

export default ActiveGeneratorUpgradeComponent;
