export interface Generator {
    generatorName: string,
    resourceName: string,
    generationType: string,
    generatorCount: number,
    generatorPrice: number
}

export interface PassiveGenerator extends Generator{
    generatorCooldown: number,
    generatorValue: number
}