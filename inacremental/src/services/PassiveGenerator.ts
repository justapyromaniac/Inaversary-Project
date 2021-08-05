import Generator from "./Generator";

//class for a passive generator. A generator that makes resource over time automatically
export default class PassiveGenerator extends Generator {
    constructor(resourceName: string, generationValue: number, resourceValue: number, timeout: number) {
        super(resourceName, generationValue, resourceValue, timeout);
    }

    public handleTimer(): void {
        super.increment()
    }
}