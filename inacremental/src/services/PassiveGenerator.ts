import Generator from "./Generator";

//class for a passive generator. A generator that makes resource over time automatically
export default class PassiveGenerator extends Generator {
    private generatorCooldown: number;

    constructor(generatorName: string, generationValue: number, generatorCooldown: number) {
        super(generatorName, generationValue);
        this.generatorCooldown = generatorCooldown;
    }

    public handleTimer(): void {
        super.increment()
    }
}