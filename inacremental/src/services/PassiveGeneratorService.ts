import GeneratorService from "./GeneratorService";

//class for a passive generator. A generator that makes resource over time automatically
export default class PassiveResourceGenerator extends GeneratorService {
    private generatorCooldown: number;

    constructor(generatorName: string, generationValue: number, generatorCooldown: number) {
        super(generatorName, generationValue);
        this.generatorCooldown = generatorCooldown;
    }

    public handleTimerEvent(): void {
        super.increment()
    }
}