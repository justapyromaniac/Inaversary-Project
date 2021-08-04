import { useEffect, useState } from "react"
import VariableStore, { UpdateObserver } from "../services/VariableStore";
import _ from 'lodash';

interface CounterComponentProps {
    resourceName: string,
    resourceValue: number
}

//component for a single counter, needs to update every time to counter service's update method is called
export const CounterComponent: React.FC<CounterComponentProps> = (props: CounterComponentProps) => {
    const [resourceValue, setResourceValue] = useState<number>(props.resourceValue);

    const onUpdate: UpdateObserver = (resourceName: string, resourceValue: number) => {
        if(_.isEqual(props.resourceName, resourceName))
            setResourceValue(resourceValue);
    }

    useEffect(() => {
        VariableStore.registerObserver(onUpdate);

        return () => VariableStore.removeObserver(onUpdate);
    })

    return(
        <span>{props.resourceName}<br/>{resourceValue}</span>
    );
}