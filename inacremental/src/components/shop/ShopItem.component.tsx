import { Button, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Generator } from '../../services/Generator';
import PassiveGeneratorService from '../../services/PassiveGeneratorService';
import VariableStore, { UpdateObserver } from '../../services/VariableStore';

const useStyles = makeStyles((theme) => ({
    shopItemRoot: {
        height: '100%',
        width: '100%'
    },
    shopItem: {
        marginBottom: '0.5rem',
    },
    shopItemButton: {
        height: '100%',
        width: '100%'
    }
}));

export const ShopItemComponent: React.FC<Generator> = (generator: Generator) => {
    const classes = useStyles();
    const generatorService = VariableStore.getGeneratorServiceByName(generator.generatorName) as PassiveGeneratorService;
    const [generatorAvailable, setGeneratorAvailable] = useState<boolean>();
    const [currentResourceValue, setCurrentResourceValue] = useState<number>(VariableStore.getResourceValue(generator.resourceName));

    //purely exists to force a reload every time a generator is bought, otherwise the state only updates when the button is no longer active
    const [generatorCount, setGeneratorCount] = useState<number>(generatorService.getGeneratorCount);

    //check if the generator is actually available, since state updates only happen when the state is different from the start
    const onUpdate: UpdateObserver = useCallback((resourceName: string, resourceValue: number) => {
        if(_.isEqual(generator.resourceName, resourceName)) {
            setCurrentResourceValue(resourceValue)
        }
    }, [generator.resourceName])

    const purchaseGenerator = () => {
        generatorService.purchaseGenerator();
        setGeneratorCount(generatorService.getGeneratorCount);
    }

    useEffect(() => {
        VariableStore.registerObserver(onUpdate);
        setGeneratorAvailable(generator.generatorPrice <= currentResourceValue);
        return () => {
            VariableStore.removeObserver(onUpdate);
        }
    }, [onUpdate, currentResourceValue, generator.generatorPrice])

    return (
        <Tooltip title={"test"} placement="left" arrow>
            <div className={classes.shopItemRoot}>
                <Button
                    variant='text'
                    className={classes.shopItemButton}
                    disabled={!generatorAvailable} 
                    onClick={purchaseGenerator}
                >
                    <Grid container spacing={0} className={classes.shopItem}>
                        <Grid item xs={2}>
                            <Typography>Art (coming soon!)</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{generatorService.getGeneratorName}</Typography>
                            <Typography>Cost: {generatorService.calculateGeneratorCost()} {generatorService.getResourceName}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant='h4'>{generatorCount}</Typography>
                        </Grid>
                    </Grid>
                </Button>
            </div>
        </Tooltip>
    );
};