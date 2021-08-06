import Generator from "./Generator";

//class for a passive generator. A generator that makes resource over time automatically
export default class PassiveGenerator extends Generator {
    constructor(generatorName: string, generationValue: number, generatorCooldown: number) {
        super(generatorName, generationValue, generatorCooldown);
    }

    public handleTimer(): void {
        super.increment()
    }
}