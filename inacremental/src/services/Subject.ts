import Counter from "./Counter";

//interface for subject part of observer pattern
export default interface Subject {
    registerObserver(Counter: Counter): void,
    removeObserver(Counter: Counter): void,
    notifyObservers(resourceName: string, resourceValue: number): void
}