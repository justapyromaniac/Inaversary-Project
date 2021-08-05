import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class Generator  {
    private resourceName: string;
    private generationValue: number;
    private timeout: number;

    protected constructor(resourceName: string, generationValue: number, timeout: number) {
        this.resourceName = resourceName;
        this.generationValue = generationValue;
        this.timeout = timeout;
    }

    protected increment(): void {
        VariableStore.addResource(VariableStore.CurrentMember.name, this.resourceName, this.generationValue);
    }
}

export default Generator;