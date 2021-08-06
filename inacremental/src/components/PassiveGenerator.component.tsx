import { useEffect, useState } from "react";
import PassiveGenerator from "../services/PassiveGenerator";
import { PassiveVariableGenerator } from "../services/VariableStore";

export const PassiveGeneratorComponent: React.FC<PassiveVariableGenerator> = (resource: PassiveVariableGenerator) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const generator = new PassiveGenerator(resource.generatorName, resource.generatorValue, resource.generatorCooldown);

    const handleTimer = () => {
        if(seconds > 0 && seconds % resource.generatorCooldown === 0){
            generator.handleTimer();
        }
    }

    useEffect(() => {
        let interval = null;
        if(isActive){
            handleTimer();
            interval = setInterval(() => { 
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    });

    const activateTimer = () => {
        setActive(!isActive);
    }

    return (
        <div>
        <button onClick={activateTimer}>activate timer</button>
        <br></br>
        <text>{seconds}</text>
        <br></br>
        </div>
    );
}
