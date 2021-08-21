import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Generator } from '../services/Generator';
import PassiveGeneratorService from '../services/PassiveGeneratorService';
import VariableStore, { UpdateObserver } from '../services/VariableStore';

const useStyles = makeStyles((theme) => ({
    shopItem: {
        marginBottom: '0.5rem',
    },
    shopItemButton: {
        height: '100%',
        width: '100%'
    }
}));

const ShopComponent: React.FC<Generator> = (generator: Generator) =>{
    const classes = useStyles();
    const generatorService = VariableStore.getGeneratorService(generator.generatorName) as PassiveGeneratorService;
    const [upgradeAvailable, setUpgradeAvailable] = useState<boolean>(false);

    //purely exists to force a reload every time a generator is bought, otherwise the state only updates when the button is no longer active
    const [generatorCount, setGeneratorCount] = useState<number>(generatorService.getGeneratorCount);

    //check if the upgrade is actually available, since state updates only happen when the state is different from the start
    const onUpdate: UpdateObserver = (resourceName: string, resourceValue: number) => {
        if(_.isEqual(generatorService.getResourceName, resourceName))
            setUpgradeAvailable(generatorService.calculateGeneratorCost() <= resourceValue);
    }

    const purchaseGenerator = () => {
        generatorService.purchaseGenerator();
        setGeneratorCount(generatorService.getGeneratorCount);
    }

    useEffect(() => {
        VariableStore.registerObserver(onUpdate);

        return () => {
            VariableStore.removeObserver(onUpdate);
        }
    })

    return (
        <Grid container spacing={0} className={classes.shopItem}>
            <Grid item xs={2}>
                <Button 
                    className={classes.shopItemButton}
                    disabled={!upgradeAvailable} 
                    onClick={purchaseGenerator}
                >
                    Purchase
                </Button>
            </Grid>
            <Grid item xs={9}>
                <Typography>{generatorService.getGeneratorName}</Typography>
                <Typography>Cost: {generatorService.calculateGeneratorCost()} {generatorService.getResourceName}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant='h4'>{generatorCount}</Typography>
            </Grid>
        </Grid>
    );
};

export default ShopComponent;