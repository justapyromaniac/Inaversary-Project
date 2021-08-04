import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class Generator  {
    private resourceName: string;
    private generationValue: number;

    protected constructor(resourceName: string, generationValue: number) {
        this.resourceName = resourceName;
        this.generationValue = generationValue;
    }

    protected increment(): void {
        VariableStore.addResource(VariableStore.CurrentMember.name, this.resourceName, this.generationValue);
    }
}

export default Generator;