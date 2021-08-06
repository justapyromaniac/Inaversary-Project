import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class Generator  {
    private generatorName: string;
    private generatorValue: number;

    protected constructor(generatorName: string, generatorValue: number) {
        this.generatorName = generatorName;
        this.generatorValue = generatorValue;
    }

    protected increment(): void {
        VariableStore.increaseMemberResource(VariableStore.CurrentMember.name, this.generatorValue);
    }
}

export default Generator;