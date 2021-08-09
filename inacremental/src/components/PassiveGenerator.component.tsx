import { useEffect, useState } from "react";
import PassiveResourceGenerator from "../services/PassiveGeneratorService";
import { PassiveGenerator } from "../services/Generator";
import { Button, Typography } from "@material-ui/core";

export const PassiveGeneratorComponent: React.FC<PassiveGenerator> = (resource: PassiveGenerator) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);
    const generator = new PassiveResourceGenerator(resource.generatorName, resource.generatorValue, resource.generatorCooldown);

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
            <Button onClick={activateTimer}>activate timer</Button>
            <br/>
            <Typography>{seconds}</Typography>
            <br/>
        </div>
    );
}
