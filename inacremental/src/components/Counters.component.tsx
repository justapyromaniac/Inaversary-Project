//collection of all counters that need to be displayed
//displayed counters vary on th active character
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import VariableStore, { UpdateCountersList } from "../services/VariableStore";
import { CounterComponent } from "./Counter.component";

//the application needs to rerender if a new resource was generated to update the subscribed counter services
export const CounterListComponent: React.FC = () => {
    const currentMember = VariableStore.CurrentMember;
    const [counters, setCounters] = useState<Object>({});

    const onUpdate: UpdateCountersList = (resources: Object) => {
        
        setCounters(resources);
    }
    
    useEffect(() => {
        VariableStore.registerCountersList(onUpdate);
        if(VariableStore.getVariables[currentMember.name as keyof Object] !== undefined) {
            setCounters(VariableStore.getVariables[currentMember.name as keyof Object])
        }
        
        return () => VariableStore.removeCountersList();
    }, [currentMember.name])

    return(
        <div>
            {Object.entries(counters).map(x => {
                return <CounterComponent key={nanoid()} resourceName={x[0]} resourceValue={x[1]}/>
            })}
        </div>
    );
}