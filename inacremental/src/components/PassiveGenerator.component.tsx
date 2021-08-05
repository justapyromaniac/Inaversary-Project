import { useEffect, useState } from "react";
import PassiveGenerator from "../services/PassiveGenerator";
import { Resource } from "../services/VariableStore";

export const PassiveGeneratorComponent: React.FC<Resource> = (resource: Resource) => {
    const [seconds, setSeconds] = useState(0);
    const generator = new PassiveGenerator(resource.resourceName, 1, resource.value, resource.timeout);

    const handleTimer = () => {
        generator.handleTimer();
    }

    useEffect(() => {
        let interval = null;

        if(seconds > 0 && seconds % resource.timeout === 0){
            handleTimer();
        } 

        interval = setInterval(() => { 
            setSeconds(seconds => seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
       <div>
        <text>{seconds}</text>
        <br></br>
        </div>
    );
}
