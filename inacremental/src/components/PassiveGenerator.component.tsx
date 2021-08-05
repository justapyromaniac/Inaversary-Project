import { useEffect, useState } from "react";
import PassiveGenerator from "../services/PassiveGenerator";
import { Resource } from "../services/VariableStore";

export const PassiveTakoComponent: React.FC<Resource> = (resource: Resource) => {
    const [seconds, setSeconds] = useState(0);
    const generator = new PassiveGenerator(resource.resourceName, 1);
    const timeout = resource.timeout;

    const handleTimer = () => {
        generator.handleTimer();
    }

    useEffect(() => {
        let interval = null;

        if(seconds % resource.timeout == 0 ){
            handleTimer();
        } 

        interval = setInterval(() => { 
            setSeconds(seconds => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <text>{seconds}</text>
    );
}