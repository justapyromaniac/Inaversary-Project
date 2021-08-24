import GeneratorService from "./GeneratorService";

//class for a passive generator. A generator that makes resource over time automatically
export default class PassiveGeneratorService extends GeneratorService {
    private generatorCooldown: number;
    private interval: NodeJS.Timeout;

    public get getInterval(): NodeJS.Timeout {
        return this.interval;
    }

    constructor(generatorName: string, generationValue: number, resourceName: string, generatorPrice: number, generatorCooldown: number) {
        super(generatorName, generationValue, generatorPrice, resourceName);
        this.generatorCooldown = generatorCooldown;
    }

    public stopInterval(interval: NodeJS.Timeout): void {
        clearInterval(interval);
    }

    private startInterval(): void {
        this.interval = setInterval(() => {
            this.handleTimerEvent();
        }, this.generatorCooldown * 1000)
    }

    public handleTimerEvent(): void {
        super.increment()
    }

    public setGeneratorCooldown(value: number){
        this.generatorCooldown = this.generatorCooldown * value;
    }

    public getGeneratorCooldown(): number{
        return this.generatorCooldown;
    }
}