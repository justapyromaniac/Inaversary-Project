export interface Generator {
    generatorName: string,
    resourceName: string,
    generatorType: string,
    generatorPrice: number
}

export interface PassiveGenerator extends Generator{
    generatorCooldown: number,
    generatorValue: number
}