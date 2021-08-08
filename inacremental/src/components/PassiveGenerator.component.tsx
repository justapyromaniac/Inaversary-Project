import { useEffect, useState } from "react";
import PassiveGeneratorService from "../services/PassiveGeneratorService";
import { PassiveGenerator } from "../services/Generator";
import VariableStore from "../services/VariableStore";

export const PassiveGeneratorComponent: React.FC<PassiveGenerator> = (resource: PassiveGenerator) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const generator = VariableStore.getGeneratorService(resource.generatorName) as PassiveGeneratorService;

    const handleTimerEvent = () => {
        if(seconds > 0 && seconds % resource.generatorCooldown === 0){
            generator.handleTimerEvent();
            console.log(generator);
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
