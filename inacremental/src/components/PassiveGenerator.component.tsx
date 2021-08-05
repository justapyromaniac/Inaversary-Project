import { useEffect, useState } from "react";
import PassiveGenerator from "../services/PassiveGenerator";
import { Resource } from "../services/VariableStore";

export const PassiveGeneratorComponent: React.FC<Resource> = (resource: Resource) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const generator = new PassiveGenerator(resource.resourceName, resource.value, resource.timeout);

    const handleTimer = () => {
        if(seconds > 0 && seconds % resource.timeout === 0){
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
