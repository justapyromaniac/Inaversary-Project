import {Generator} from '../services/Generator';
import VariableStore from '../services/VariableStore';

const ShopComponent: React.FC<Generator> = (generator: Generator) =>{
    const generatorService = VariableStore.getGeneratorService(generator.generatorName);

    const purchaseGenerator = () =>{
        console.log(generator);
        generatorService.purchaseGenerator();
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