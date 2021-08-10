import ActiveGeneratorService from '../services/ActiveGeneratorService';
import {Generator} from '../services/Generator';
import PassiveGeneratorService from '../services/PassiveGeneratorService';
import VariableStore from '../services/VariableStore';

const ShopComponent: React.FC<Generator> = (generator: Generator) =>{
    const generatorService = VariableStore.getGeneratorService(generator.generatorName);

    const purchaseGenerator = () =>{
        if(generator.generationType === 'active'){
            (generatorService as ActiveGeneratorService).purchaseGenerator(generator.generatorPrice);
        }else{
            (generatorService as PassiveGeneratorService).purchaseGenerator(generator.generatorPrice);
        }
    }

    return (
        <div>
            {generator.generatorName}

            <br/>
            <div>
                Cost: {generator.generatorPrice} {generator.resourceName}
            </div>
            <button onClick={purchaseGenerator}>Purchase</button>
            <br/>
            <br/>
        </div>
    );
};

export default ShopComponent;