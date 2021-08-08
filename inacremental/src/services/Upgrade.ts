export interface Upgrade {
    name: string,
    type: string,
    purchasePrice: number,
    purchaseResourceName: string
}

export interface ActiveGeneratorUpgrade extends Upgrade {
    generatorName: string;
    valueMultiplier: number;
}

