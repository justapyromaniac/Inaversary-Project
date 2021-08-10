import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class GeneratorService  {
    private generatorName: string;
    private generatorValue: number;
    private upgradeMultiplier: number;
    private generatorCount: number;

    protected constructor(generatorName: string, generatorValue: number) {
        this.generatorName = generatorName;
        this.generatorValue = generatorValue;
        this.upgradeMultiplier = 1;
        this.generatorCount = 1;
    }

    protected increment(): void {
        VariableStore.increaseMemberResource(this.generatorValue * this.upgradeMultiplier * this.generatorCount);
    }

    protected purchaseUpgrade(upgradeMultiplier: number, upgradeCost: number): void{
        this.setUpgradeMultiplier(this.upgradeMultiplier * upgradeMultiplier);
        VariableStore.decreaseMemberResource(upgradeCost);
    }

    protected purchaseGenerator(generatorCost: number): void{
        this.setGeneratorCount(this.generatorCount + 1);
        VariableStore.decreaseMemberResource(generatorCost);
    }

    public setGeneratorCount(generatorCount: number): void{
        this.generatorCount = generatorCount;
        console.log(generatorCount);
    }

    public setUpgradeMultiplier(upgradeMultiplier: number): void{
        this.upgradeMultiplier = upgradeMultiplier;
    }

    public getGeneratorName(): string{
        return this.generatorName;
    }
}

export default GeneratorService;