import GeneratorService from "./GeneratorService";
import PassiveGeneratorService from "./PassiveGeneratorService";
import VariableStore from "./VariableStore";

export default class GoldenCookieService{
    private cookieType: string;
    private generatorName: string;

    constructor(){
        this.selectRandomType();
    }

    public selectRandomGenerator(): void{
        let tempGenerator: GeneratorService[] = new Array();

        VariableStore.CurrentMember.generators
        .filter(generatorType => generatorType.generatorType === this.cookieType)
        .forEach(x=>{
            let temp = VariableStore.getGeneratorServiceByName(x.generatorName);
            tempGenerator.push(temp);
        });

        let random = Math.floor(Math.random()*tempGenerator.length);

        this.generatorName = tempGenerator[random].getGeneratorName();
    }

    public selectRandomType(): void{
        let random = Math.floor(Math.random()*3) + 1;

        switch(random){
            case 1: this.cookieType = 'fixed'; break;
            case 2: this.cookieType = 'active'; break;
            case 3: this.cookieType = 'passive'; break;
            default: this.cookieType = 'fixed'; break;
        }
    }
    
    public apply(): void{
        if(this.cookieType === 'fixed'){
            VariableStore.addPercentage(15);
        }else{
            this.selectRandomGenerator();
            this.updateGenerator();
        }
    }

    private updateGenerator(){
        VariableStore.CurrentMember.generators
        .filter(generator => generator.generatorType === this.cookieType && this.generatorName === generator.generatorName)
        .forEach(x=>{
            let temp = VariableStore.getGeneratorServiceByName(x.generatorName);
            temp.setGeneratorCount(temp.getGeneratorCount() * 10);
        });
    }

    public revert(): void{
        VariableStore.CurrentMember.generators
        .filter(generator => generator.generatorType === this.cookieType && this.generatorName === generator.generatorName)
        .forEach(x=>{
            let temp = VariableStore.getGeneratorServiceByName(x.generatorName);
            temp.setGeneratorCount(temp.getGeneratorCount() / 10);
        });
    }
}