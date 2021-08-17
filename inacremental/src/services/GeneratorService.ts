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
        VariableStore.updateMemberResource(this.generatorValue * this.upgradeMultiplier * this.generatorCount);
    }

    public purchaseUpgrade(upgradeMultiplier: number, upgradeCost: number): void{
        this.setUpgradeMultiplier(this.upgradeMultiplier * upgradeMultiplier);
        VariableStore.updateMemberResource(upgradeCost*-1);
    }

    public purchaseGenerator(generatorCost: number): void{
        this.setGeneratorCount(this.generatorCount + 1);
        VariableStore.updateMemberResource(generatorCost*-1);
    }

    public setGeneratorCount(generatorCount: number): void{
        this.generatorCount = generatorCount;
    }

    public setUpgradeMultiplier(upgradeMultiplier: number): void{
        this.upgradeMultiplier = upgradeMultiplier;
    }

    public getGeneratorName(): string{
        return this.generatorName;
    }

    public getGeneratorCount(): number{
        return this.generatorCount;
    }
}

export default GeneratorService;