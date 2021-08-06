import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class Generator  {
    private generatorName: string;
    private generationValue: number;

    protected constructor(generatorName: string, generationValue: number, generatorCooldown: number) {
        this.generatorName = generatorName;
        this.generationValue = generationValue;
    }

    protected increment(): void {
        VariableStore.addResource(VariableStore.CurrentMember.name, this.generationValue);
    }
}

export default Generator;