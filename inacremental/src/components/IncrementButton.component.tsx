import { Button } from "@material-ui/core";
import ActiveGeneratorService from "../services/ActiveGeneratorService";
import { Generator } from "../services/Generator";
//test for active generator
export const IncrementButtonComponent: React.FC<Generator> = (resource: Generator) => {
    const generator = new ActiveGeneratorService(resource.generatorName);
    const handleClick = () => {
        generator.handleClick();
    }

    return (
        <Button onClick={() => handleClick()}>{resource.generatorName}</Button>
    );
}