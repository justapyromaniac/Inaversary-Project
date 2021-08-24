import GeneratorService from "./GeneratorService";

//class for an active generator. Parts you need to interact with for it to make resources
export default class ActiveGeneratorService extends GeneratorService {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(generatorName: string, generationValue: number, generatorPrice: number, resourceName: string) {
        super(generatorName, generationValue, generatorPrice, resourceName);
        this.generatorCount = 1;
    }

    public handleClick(): void {
        super.increment();
    }
}
