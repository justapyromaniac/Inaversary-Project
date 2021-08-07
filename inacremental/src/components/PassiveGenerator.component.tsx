import { useEffect, useState } from "react";
import PassiveGenerator from "../services/PassiveGenerator";
import { PassiveVariableGenerator } from "../services/Member";

export const PassiveGeneratorComponent: React.FC<PassiveVariableGenerator> = (resource: PassiveVariableGenerator) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const generator = new PassiveGenerator(resource.generatorName, resource.generatorValue, resource.generatorCooldown);

    const handleTimerEvent = () => {
        if(seconds > 0 && seconds % resource.generatorCooldown === 0){
            generator.handleTimerEvent();
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if(isActive){
            handleTimerEvent();
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
