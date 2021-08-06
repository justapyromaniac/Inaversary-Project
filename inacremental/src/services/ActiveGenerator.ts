import Generator from "./Generator";

//class for an active generator. Parts you need to interact with for it to make resources
export default class ActiveGenerator extends Generator {

    
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(resourceName: string, generationValue: number, productionCooldown: number) {
        super(resourceName, generationValue, productionCooldown);
    }

    public handleClick(): void {
        super.increment();
    }
}
