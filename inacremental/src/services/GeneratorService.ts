import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class GeneratorService  {
    // #region generatorName [ rgba(255, 0, 0, 1) ]

    private generatorName: string;

    public get getGeneratorName(): string {
        return this.generatorName;
    }

    // #endregion

    // #region generatorValue [ rgba(255, 0, 0, 1) ]

    private generatorValue: number;

    public get getGeneratorValue(): number {
        return this.generatorValue;
    }

    // #endregion

    // #region generatorCount [ rgba(255, 0, 0, 1) ]

    protected generatorCount: number;

    public get getGeneratorCount(): number {
        return this.generatorCount;
    } 

    public set setGeneratorCount(generatorCount: number) {
        this.generatorCount = generatorCount;
    }
    
    // #endregion

    // #region generatorPrice [ rgba(255, 0, 0, 1) ]

    private generatorPrice: number;

    public get getGeneratorPrice(): number {
        return this.generatorPrice;
    }

    // #endregion
    
    // #region upgradeMultiplier [ rgba(255, 0, 0, 1) ]

    private upgradeMultiplier: number;

    public get getUpgradeMultiplier(): number {
        return this.upgradeMultiplier;
    }

    public set setUpgradeMultiplier(upgradeMultiplier: number) {
        this.upgradeMultiplier = upgradeMultiplier;
    }

    // #endregion

    // #region resourceName [ rgba(255, 0, 0, 1) ]

    private resourceName: string;

    public get getResourceName(): string {
        return this.resourceName;
    }

    // #endregion

    private costMultiplier: number = 1.08;

    protected constructor(generatorName: string, generatorValue: number, generatorPrice: number, resourceName: string) {
        this.generatorName = generatorName;
        this.generatorValue = generatorValue;
        this.generatorPrice = generatorPrice;
        this.resourceName = resourceName;
        this.upgradeMultiplier = 1;
        this.generatorCount = 0;
    }

    protected increment(): void {
        VariableStore.updateMemberResource(this.generatorValue * this.upgradeMultiplier * this.generatorCount);
        console.log(VariableStore.getGeneratorServiceByName(this.getGeneratorName));
    }

    public purchaseUpgrade(upgradeMultiplier: number, upgradeCost: number): void{
        this.setUpgradeMultiplier = this.upgradeMultiplier * upgradeMultiplier;
        VariableStore.updateMemberResource(upgradeCost*-1);
    }

    //steps in the calculation:
    //Math.pow: number one to the power of number two. costMultiplier is a number above one to increase the cost with every purchase 
    //generatorPrice * previous step: this increases the price exponentially depending on how many generators there are, meaning we do not have to save the current price anywhere
    //Math.ceil: the calculation before this step gives a fraction (something like x.000000001) so we round UP to ensure the cost increase steadily goes up
    public purchaseGenerator(): void{
        VariableStore.updateMemberResource(-1 * Math.ceil(this.generatorPrice * Math.pow(this.costMultiplier, this.generatorCount)));
        this.setGeneratorCount = this.generatorCount + 1;
    }

    public calculateGeneratorCost(): number {
        return Math.ceil(this.generatorPrice * Math.pow(this.costMultiplier, this.generatorCount));
    }
}

export default GeneratorService;