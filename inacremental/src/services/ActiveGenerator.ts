import Generator from "./Generator";

//class for an active generator. Parts you need to interact with for it to make resources
export default class ActiveGenerator extends Generator {

    
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(generatorName: string, generationValue: number, generatorCooldown: number) {
        super(generatorName, generationValue, generatorCooldown);
    }

    public handleClick(): void {
        super.increment();
    }
}
