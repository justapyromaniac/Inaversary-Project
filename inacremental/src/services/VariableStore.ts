import _ from "lodash";
import * as data  from '../assets/Resources.json'

//a singleton class that will contain all global variables for resources in the game
//call getInstance() and use one of the methods to increase or decrease the resource dynamically 

export type UpdateObserver = (resourceName: string, resourceValue: number) => void;
export type UpdateCountersList = (resources: Object) => void;

export interface Resource {
    resourceName: string,
    generationType: string,
    timeout: number,
    value: number
}
export interface Member {
    name: string,
    resources: Resource[],
}
class VariableStore {

    //the actual store of variables
    private Variables: Object

    private Observers: UpdateObserver[];

    private CountersList: UpdateCountersList | undefined;

    public CurrentMember!: Member;

    //the only instance of this class ever
    private static _instance: VariableStore

    //make sure the constructor is private so it cannot be called, there should NEVER be two or more of this class
    //THERE CAN BE ONLY ONE
    private constructor() {
        this.Variables = {};
        this.Observers = [];
        this.CountersList = undefined;
        this.CurrentMember = data.members[0];
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
    private createNewEntry(member: string, keyName: string, value: number): void {
        //paranoid programming as I call it: if something shouldn't happen, even if it logically cannot, make sure it won't!
        //better safe than sorry
        if(!(member in this.Variables)){
            Object.defineProperty(this.Variables, member, {
                value: {},
                writable: false,
                enumerable: true,
            });
            this.notifyCountersList();
            this.notifyObservers(keyName, value);
        }
        
        if(!(keyName in this.Variables)) {
            Object.defineProperty(this.Variables[member as keyof Object], keyName, {
                value: value,
                writable: true,
                enumerable: true,
            });
            this.notifyCountersList();
            this.notifyObservers(keyName, value);
        } 
    }

    //increase the resource count
    public addResource(member: string, keyName: string, value: number): void {
        //check if the resource actually exists before increasing it, otherwise you'll get an error
        const memberEntryExists = _.includes(Object.keys(this.Variables), member)
        const resourceEntryExists = this.Variables[member as keyof Object] !== undefined && (keyName in this.Variables[member as keyof Object])
        if(!resourceEntryExists || !memberEntryExists) {
            this.createNewEntry(member, keyName, value);
        } else {
            Object.entries(this.Variables[member as keyof Object]).forEach(key => {
                if(key[0] === keyName) {
                    key[1] = key[1] + value;
                    let temp = {};
                    Object.defineProperty(temp, key[0], {
                        value: key[1],
                        writable: true,
                        enumerable: true,
                    })
                    Object.assign(this.Variables[member as keyof Object], temp)
                    this.notifyCountersList();
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
            this.CountersList(this.Variables[this.CurrentMember.name as keyof Object]);
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