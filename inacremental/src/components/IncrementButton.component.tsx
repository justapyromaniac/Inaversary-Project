import ActiveGenerator from "../services/ActiveGenerator";
import { VariableGenerator } from "../services/VariableStore";
//test for active generator
export const IncrementButtonComponent: React.FC<VariableGenerator> = (resource: VariableGenerator) => {
    const generator = new ActiveGenerator(resource.generatorName);
    const handleClick = () => {
        generator.handleClick();
    }

    return (
        <button onClick={() => handleClick()}>{resource.generatorName}</button>
    );
}