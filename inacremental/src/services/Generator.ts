import { Upgrade } from "./Upgrade";

export interface Generator {
    generatorName: string,
    resourceName: string,
    generatorType: string,
    generatorPrice: number,
    upgrades: Upgrade[]
}

export interface PassiveGenerator extends Generator{
    generatorCooldown: number,
    generatorValue: number
}