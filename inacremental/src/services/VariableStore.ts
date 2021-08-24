import _ from "lodash";
import * as data from '../assets/Resources.json'
import { Member } from './Member'
import GeneratorService from './GeneratorService'
import ActiveGeneratorService from "./ActiveGeneratorService";
import PassiveGeneratorService from "./PassiveGeneratorService";
import { PassiveGenerator } from "./Generator";
import { Upgrade } from "./Upgrade";

//a singleton class that will contain all global variables for resources in the game
//call getInstance() and use one of the methods to increase or decrease the resource dynamically 

export type UpdateObserver = (resourceName: string, resourceValue: number) => void;
export type UpdateCountersList = (resources: Object) => void;

export interface Generation {
    generationName: string,
    members: Member[]
}

class VariableStore {

    //the actual store of variables
    private Variables: Object

    private Observers: UpdateObserver[];

    private CountersList: UpdateCountersList | undefined;

    private GeneratorServiceList: GeneratorService[];

    public CurrentMember!: Member;

    private PurchasedUpgradesList: Upgrade[];

    //the only instance of this class ever
    private static _instance: VariableStore

    //make sure the constructor is private so it cannot be called, there should NEVER be two or more of this class
    //THERE CAN BE ONLY ONE
    private constructor() {
        this.Variables = {};
        this.Observers = [];
        this.GeneratorServiceList = [];
        this.PurchasedUpgradesList = [];
        this.CountersList = undefined;
        this.CurrentMember = data.generations[10].members[0];    
        this.generateServiceList();    
    }

    // creates a list of all the generators
    private generateServiceList(){
        this.CurrentMember.generators.forEach(member=>{
            let generatorService: GeneratorService;
            let passiveGenerator: PassiveGenerator;

            if(member.generatorType === 'active'){
                generatorService = new ActiveGeneratorService(member.generatorName, 1, member.generatorPrice, member.resourceName);
            }else{
                passiveGenerator = member as PassiveGenerator;
                generatorService = new PassiveGeneratorService(passiveGenerator.generatorName, passiveGenerator.generatorValue, passiveGenerator.resourceName, passiveGenerator.generatorPrice, passiveGenerator.generatorCooldown);
            }

            this.GeneratorServiceList.push(generatorService);
        });
    }

    public addPurchasedUpgrade(upgrade: Upgrade): void {
        this.PurchasedUpgradesList.push(upgrade);
    }

    public get getPurchasedUpgradesList(): Upgrade[] {
        return this.PurchasedUpgradesList;
    }

    //The only way to actually get the class, to ensure noone can change the instance somehow
    public static get getInstance(): VariableStore {
        if (this._instance === undefined) {
            this._instance = new VariableStore();
        }

        return this._instance;
    }

    get getVariables(): Object {
        return this.Variables;
    }

    // returns the GeneratorService with the matching GeneratorName
    public getGeneratorServiceByName(generatorName: string): GeneratorService {
        return this.GeneratorServiceList.find( x => x.getGeneratorName === generatorName);
    }

    public getResourceValue(resourceName: string): number {
        let output = 0;
        if(!_.isEqual(this.Variables, {})) {
            Object.entries(this.Variables[this.CurrentMember.name as keyof Object]).forEach(resource => {
                if(_.isEqual(resource[0], resourceName)) {
                    output = resource[1];
                }
            })
        }
        return output;
    }

    public getGenerators(): GeneratorService[]{
        return this.GeneratorServiceList;
    }

    //if the resource isn't registered, register it
    //this function can only be called here so manually using this is impossible
    //the resources will be defined in a file elsewhere
    private createNewEntry(member: string, keyName: string, value: number): void {
        //paranoid programming as I call it: if something shouldn't happen, even if it logically cannot, make sure it won't!
        //better safe than sorry
        if (!(member in this.Variables)) {
            Object.defineProperty(this.Variables, member, {
                value: {},
                writable: false,
                enumerable: true,
            });
            this.notifyCountersList();
            this.notifyObservers(keyName, value);
        }

        if (!(keyName in this.Variables)) {
            Object.defineProperty(this.Variables[member as keyof Object], keyName, {
                value: value,
                writable: true,
                enumerable: true,
            });
            this.notifyCountersList();
            this.notifyObservers(keyName, value);
        }
    }

    public updateMemberResource(value: number){
        //check if the resource actually exists before increasing it, otherwise you'll get an error
        let keyName = this.CurrentMember.generators[0].resourceName;
        let member = this.CurrentMember.name;

        const memberEntryExists = _.includes(Object.keys(this.Variables), member)
        const resourceEntryExists = this.Variables[member as keyof Object] !== undefined && (keyName in this.Variables[member as keyof Object])

        if (!resourceEntryExists || !memberEntryExists) {
            this.createNewEntry(member, keyName, value);
        } else {
            Object.entries(this.Variables[member as keyof Object]).forEach(key => {
                if (key[0] === keyName) {
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
                    //console.log(this.Variables)
                    //console.log(this.GeneratorServiceList)
                }
            });
        }
    }

    public addPercentage(percentage: number): void{
        let keyName = this.CurrentMember.generators[0].resourceName;
        let member = this.CurrentMember.name;

        const memberEntryExists = _.includes(Object.keys(this.Variables), member)
        const resourceEntryExists = this.Variables[member as keyof Object] !== undefined && (keyName in this.Variables[member as keyof Object])

        if (!resourceEntryExists || !memberEntryExists) {
            this.createNewEntry(member, keyName, 1);
        } else {
            Object.entries(this.Variables[member as keyof Object]).forEach(key => {
                if (key[0] === keyName) {
                    key[1] = key[1] + Math.ceil(key[1] * (percentage/100));
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
        if (this.CountersList !== undefined && this.CurrentMember !== undefined) {
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