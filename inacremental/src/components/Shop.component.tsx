import { Button } from '@material-ui/core';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import ActiveGeneratorService from '../services/ActiveGeneratorService';
import {Generator} from '../services/Generator';
import PassiveGeneratorService from '../services/PassiveGeneratorService';
import VariableStore, { UpdateObserver } from '../services/VariableStore';

const ShopComponent: React.FC<Generator> = (generator: Generator) =>{
    const generatorService = VariableStore.getGeneratorService(generator.generatorName);
    const [upgradeAvailable, setUpgradeAvailable] = useState(true);

    const onUpdate: UpdateObserver = (resourceName: string, resourceValue: number) => {
        if(_.isEqual(generator.resourceName, resourceName))
            setUpgradeAvailable(generator.generatorPrice > resourceValue);
    }

    const purchaseGenerator = () =>{
        generatorService.purchaseGenerator(generator.generatorPrice);
    }

    useEffect(() => {
        VariableStore.registerObserver(onUpdate);

        return () => VariableStore.removeObserver(onUpdate);
    })

    return (
        <div>
            {generator.generatorName}

            <br/>
            <div>
                Cost: {generator.generatorPrice} {generator.resourceName}
            </div>
            <Button disabled={upgradeAvailable} onClick={purchaseGenerator}>Purchase</Button>
            <br/>
            <br/>
        </div>
    );
};

export default ShopComponent;