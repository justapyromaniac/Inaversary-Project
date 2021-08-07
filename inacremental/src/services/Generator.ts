export interface Generator {
    generatorName: string,
    resourceName: string,
    generationType: string
}

export interface PassiveGenerator extends Generator{
    generatorCooldown: number,
    generatorValue: number
}