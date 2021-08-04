import VariableStore from "./VariableStore";

//abstract class for resource generators, will contain all shared upgrade variables and general incrementing logic
abstract class Generator  {
    private VariableStore = VariableStore;
    protected static increment(): void {
        VariableStore.addResource("test", 1);
    }
}

export default Generator;