import GeneratorService from "./GeneratorService";

//class for an active generator. Parts you need to interact with for it to make resources
export default class ActiveGeneratorService extends GeneratorService {
   
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(generatorName: string) {
        super(generatorName, 1);
    }

    public handleClick(): void {
        super.increment();
    }

    public purchaseUpgrade(upgradeMultiplier: number, upgradeCost: number): void{
        super.purchaseUpgrade(upgradeMultiplier, upgradeCost);
    }

    public purchaseGenerator(generatorCost: number): void{
        super.purchaseGenerator(generatorCost);
    }
}
