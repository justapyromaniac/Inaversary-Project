import ActiveGeneratorService from "../services/ActiveGeneratorService";
import { Generator } from "../services/Generator";
import VariableStore from "../services/VariableStore";
//test for active generator
export const ActiveGeneratorComponent: React.FC<Generator> = (resource: Generator) => {
    const generator = VariableStore.getGeneratorService(resource.generatorName) as ActiveGeneratorService;

    const handleClick = () => {
        generator.handleClick();
    }

    return (
        <button onClick={() => handleClick()}>{resource.generatorName}</button>
    );
}