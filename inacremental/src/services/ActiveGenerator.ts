import Generator from "./Generator";

//class for an active generator. Parts you need to interact with for it to make resources
export default class ActiveGenerator extends Generator {

    
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(generatorName: string) {
        super(generatorName, 1);
    }

    public handleClick(): void {
        super.increment();
    }
}
