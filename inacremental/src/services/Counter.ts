import Observer from "./Observer";

//implementation of the observer part of the observer pattern, may need to be a component
//haven't quite figured out how to register a component in the singleton however
//likely that we have to save this in the actual counter component
export default class Counter implements Observer{
    private resourceName: string;
    private resourceValue: number;

    constructor(resourceName: string, resourceValue: number) {
        this.resourceName = resourceName;
        this.resourceValue = resourceValue;
    }

    update(value: number): void {
        this.resourceValue = value;
    }

    public get getResourceName(): string {
        return this.resourceName;
    }

    public get getResourceValue(): number {
        return this.resourceValue;
    }
}