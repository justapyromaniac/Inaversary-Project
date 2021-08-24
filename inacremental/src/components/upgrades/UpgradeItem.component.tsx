import { Button, Tooltip, Typography, makeStyles, Grid } from "@material-ui/core";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Upgrade } from "../../services/Upgrade";
import VariableStore, { UpdateObserver } from "../../services/VariableStore";

interface UpgradeComponentProps {
    upgrade: Upgrade,
    onPurchase: () => void;
}

const useStyles = makeStyles((theme) => ({
    upgradeItemRoot: {
        height: '100%',
        width: '100%'
    },
    upgradeItem: {
        marginBottom: '0.5rem',
    },
    upgradeItemButton: {
        height: '100%',
        width: '100%'
    }
}));

export const UpgradeItemComponent: React.FC<UpgradeComponentProps> = ({upgrade, onPurchase}) =>  {
    const classes = useStyles();
    // TODO: have purchase functionality actually do something
    const generatorService = VariableStore.getGeneratorService(upgrade.generatorName);
    const [upgradeAvailable, setUpgradeAvailable] = useState<boolean>();
    const [currentResourceValue, setCurrentResourceValue] = useState<number>(VariableStore.getResourceValue(generatorService.getResourceName));

    const onUpdate: UpdateObserver = useCallback((resourceName: string, resourceValue: number) => {
        if(_.isEqual(upgrade.resourceName, resourceName)) {
            setCurrentResourceValue(resourceValue)
        }
    }, [upgrade.resourceName])

    const purchaseUpgrade = () =>{
        generatorService.purchaseUpgrade(upgrade.valueMultiplier, upgrade.upgradePrice);
        VariableStore.addPurchasedUpgrade(upgrade);
        onPurchase();
    }

    useEffect(() => {
        VariableStore.registerObserver(onUpdate);
        setUpgradeAvailable(upgrade.upgradePrice <= currentResourceValue);
        return () => VariableStore.removeObserver(onUpdate);
    }, [onUpdate, upgrade.upgradePrice, currentResourceValue])

    return (
        <Tooltip title={"test"} placement="left" arrow>
            <div className={classes.upgradeItemRoot}>
                
                <Button
                    variant='text'
                    className={classes.upgradeItemButton}
                    disabled={!upgradeAvailable} 
                    onClick={purchaseUpgrade}
                >
                    <Grid 
                        container 
                        spacing={0} 
                        className={classes.upgradeItem}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography>{upgrade.upgradeName}</Typography>
                            <br/>
                            <Typography>Cost: {upgrade.upgradePrice} {upgrade.resourceName}</Typography>
                        </Grid>
                    </Grid>
                </Button>
            </div>
        </Tooltip>
    );
};
