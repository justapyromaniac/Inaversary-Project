import _ from "lodash";

//a singleton class that will contain all global variables for resources in the game
//call getInstance() and use one of the methods to increase or decrease the resource dynamically 

export type UpdateObserver = (resourceName: string, resourceValue: number) => void;
export type UpdateCountersList = (resources: Object) => void;
class VariableStore {

    //the actual store of variables
    private Variables: Object

    private Observers: UpdateObserver[];

    private CountersList: UpdateCountersList | undefined;

    //the only instance of this class ever
    private static _instance: VariableStore

    //make sure the constructor is private so it cannot be called, there should NEVER be two or more of this class
    //THERE CAN BE ONLY ONE
    private constructor() {
        this.Variables = {};
        this.Observers = [];
        this.CountersList = undefined;
    }

    //The only way to actually get the class, to ensure noone can change the instance somehow
    public static get getInstance(): VariableStore {
        if(this._instance === undefined) {
            this._instance = new VariableStore();
        }

        return this._instance;
    }

    get getVariables(): Object {
        return this.Variables;
    }

    //if the resource isn't registered, register it
    //this function can only be called here so manually using this is impossible
    //the resources will be defined in a file elsewhere
    private createNewEntry(keyName: string, value: number): void {
        //paranoid programming as I call it: if something shouldn't happen, even if it logically cannot, make sure it won't!
        //better safe than sorry
        if(!this.Variables.hasOwnProperty(keyName)) {
            console.log("created")
            Object.defineProperty(this.Variables, keyName, {
                value: value,
                writable: true,
                enumerable: true,
            });
            this.notifyCountersList();
            this.notifyObservers(keyName, value);
        }
    }

    //increase the resource count
    public addResource(keyName: string, value: number): void {
        //check if the resource actually exists before increasing it, otherwise you'll get an error
        if(!this.Variables.hasOwnProperty(keyName)) {
            this.createNewEntry(keyName, value);
        } else {
            Object.entries(this.Variables).forEach(key => {
                if(key[0] === keyName) {
                    key[1] = key[1] + value;
                    let temp = {};
                    Object.defineProperty(temp, key[0], {
                        value: key[1],
                        writable: true,
                        enumerable: true,
                    })
                    Object.assign(this.Variables, temp)
                    this.notifyObservers(keyName, key[1]);
                }
            });
        }
    }
    
    registerCountersList(CountersList: UpdateCountersList): void {
        this.CountersList = CountersList;
    }

    removeCountersList(): void {
        this.CountersList = undefined;
    }

    notifyCountersList(): void {
        if(this.CountersList !== undefined) {
            this.CountersList(this.Variables);
        }
    }

    registerObserver(Observer: UpdateObserver): void {
        this.Observers.push(Observer);
    }

    removeObserver(ObserverToRemove: UpdateObserver): void {
        this.Observers = this.Observers.filter(Observer => !_.isEqual(ObserverToRemove, Observer))
    }

    notifyObservers(keyName: string, value: number): void {
        this.Observers.forEach(Observer => Observer(keyName, value));
        
    }
}

export default VariableStore.getInstance;