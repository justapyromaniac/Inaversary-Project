import _ from 'lodash';
import VariableStore from '../services/VariableStore';
import { CounterListComponent } from './Counters.component';
import { IncrementButtonComponent } from './IncrementButton.component';

export const MembersPageComponent: React.FC = () => {
    const currentMember = VariableStore.CurrentMember;
    return(
        <div>
            <span>{currentMember.name}</span>
            <br/>
            {
                currentMember.resources.map(resource => {
                    if(_.isEqual(resource.generationType, "active")) {
                        return <IncrementButtonComponent {...resource}/>
                    } else {
                        return null;
                    }
                })
            }
            <CounterListComponent/>
        </div>
    );
}