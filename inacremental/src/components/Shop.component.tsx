import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Generator } from '../services/Generator';
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
            <button disabled={upgradeAvailable} onClick={purchaseGenerator}>Purchase</button>
            <br/>
            <br/>
        </div>
    );
};

export default ShopComponent;