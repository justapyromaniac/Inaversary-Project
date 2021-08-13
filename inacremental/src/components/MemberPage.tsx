import { Grid, makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';
import VariableStore from '../services/VariableStore';
import { Generator, PassiveGenerator } from '../services/Generator';
import { CounterListComponent } from './Counters.component';
import { ActiveGeneratorComponent } from './ActiveGenerator.component';
import {nanoid} from 'nanoid'
import {PassiveGeneratorComponent} from './PassiveGenerator.component';
import ShopComponent from './Shop.component';
import UpgradeComponent from './Upgrade.component';
import GoldenCookieComponent from './GoldenCookie.component';
import GoldenCookieService from '../services/GoldenCookieService';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        height: '100%',
    },
    gridItem: {
        border: '1px solid black',
        height: '100%',
        textAlign: 'center',
    },
}));

export interface GoldenCookieProp{
    cookieService: GoldenCookieService;
}

export const MembersPageComponent: React.FC = () => {
    const classes = useStyles();
    const currentMember = VariableStore.CurrentMember;

    const generateActiveGenerators = () => {
        return currentMember.generators.map(generator => {
            if(_.isEqual(generator.generatorType, "active")) {
                return <ActiveGeneratorComponent key={nanoid()} {...generator}/>
            } else {
                return null;
            }
        })
    }

    const generatePassiveGenerator = () => {
        return currentMember.generators.map(generator => {
            if(_.isEqual(generator.generatorType, "passive")) {
                return <PassiveGeneratorComponent key={nanoid()} {...generator as PassiveGenerator}/>
            } else {
                return null;
            }
        })
    }

    const generateShop = () => {
        return currentMember.generators.map(generator => {
            return <ShopComponent key={nanoid()} {...generator}/>
        })
    }

    const generateUpgrades = () => {
        return currentMember.upgrades.map(upgrade => {
            return <UpgradeComponent key={nanoid()} {...upgrade}/>
        })
    }

    let g = new GoldenCookieService();

    return(
        <Grid container spacing={1} className={classes.gridContainer}>
            <Grid item xs={4} className={classes.gridItem}>
                <Typography>{currentMember.name}</Typography>
                <br/>
                {generateActiveGenerators()}
                <CounterListComponent/>
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <Typography>Idle generators (Coming soon!)</Typography>
                <br/>
                {generatePassiveGenerator()}
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <div>
                    <Typography>Shop</Typography>
                    {generateShop()}
                    <br/>
                </div>
                <br/>
                <div>
                    <Typography>Upgrades</Typography>
                    {generateUpgrades()}
                </div>
                <div>
                    <GoldenCookieComponent  key={nanoid()} cookieService={g}/>
                </div>
            </Grid>
        </Grid>
    );
}