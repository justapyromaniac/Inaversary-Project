import GeneratorService from "./GeneratorService";
import VariableStore from "./VariableStore";

export default class GoldenCookieService{
    private cookieType: string;
    private generatorName: string;
    private xPosition;
    private yPosition ;

    public selectRandomGenerator(): void{
        let tempGenerator: GeneratorService[] = [];

        VariableStore.CurrentMember.generators
        .filter(generatorType => generatorType.generatorType === this.cookieType)
        .forEach(x=>{
            let temp = VariableStore.getGeneratorServiceByName(x.generatorName);
            tempGenerator.push(temp);
        });

        let randomGenerator = Math.floor(Math.random()*tempGenerator.length);

        this.generatorName = tempGenerator[randomGenerator].getGeneratorName;
    }

    public selectRandomType(): void{
        let randomEffect = Math.floor(Math.random()*3) + 1;

        switch(randomEffect){
            case 1: this.cookieType = 'fixed'; break;
            case 2: this.cookieType = 'active'; break;
            case 3: this.cookieType = 'passive'; break;
            default: this.cookieType = 'fixed'; break;
        }

        console.log(this.cookieType);
    }
    
    public applyCookieEffect(): void{
        this.cookieType = 'passive';

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
        .forEach(generator=>{
            let temp = VariableStore.getGeneratorServiceByName(generator.generatorName);
            temp.setUpgradeMultiplier = temp.getUpgradeMultiplier * 10;
        });
    }

    public revertCookieEffect(): void{
        VariableStore.CurrentMember.generators
        .filter(generator => generator.generatorType === this.cookieType && this.generatorName === generator.generatorName)
        .forEach(generator=>{
            let temp = VariableStore.getGeneratorServiceByName(generator.generatorName);
            temp.setUpgradeMultiplier = temp.getUpgradeMultiplier / 10;
        });
    }

    public getXPosition(): number{
        return this.xPosition;
    }

    public getYPosition(): number{
        return this.yPosition;
    }

    public randomizePosition(){
        this.xPosition = Math.random() * window.innerWidth + window.innerWidth * 0.05;
        this.yPosition = Math.random() * window.innerHeight + window.innerHeight * 0.05;

        if(this.xPosition >= window.innerWidth * 0.95){
            this.xPosition = window.innerWidth * 0.95;
        }

        if(this.yPosition >= window.innerHeight * 0.87){
            this.yPosition = window.innerHeight * 0.87;
        }
    }

    public randomizeCookie(){
        this.selectRandomType();
        this.randomizePosition();
    }
}