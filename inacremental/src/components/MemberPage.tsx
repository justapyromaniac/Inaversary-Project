import { Grid, makeStyles, Typography } from '@material-ui/core';
import _ from 'lodash';
import VariableStore from '../services/VariableStore';
import { CounterListComponent } from './Counters.component';
import { IncrementButtonComponent } from './IncrementButton.component';
import {nanoid} from 'nanoid'
import UpgradeListComponent from './UpgradeList.component';

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

export const MembersPageComponent: React.FC = () => {
    const classes = useStyles();
    const currentMember = VariableStore.CurrentMember;

    const generateActiveGenerators = () => {
        return currentMember.resources.map(resource => {
            if(_.isEqual(resource.generationType, "active")) {
                return <IncrementButtonComponent key={nanoid()} {...resource}/>
            } else {
                return null;
            }
        })
    }

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
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <Typography>Upgrades</Typography>
                <UpgradeListComponent upgrades={currentMember.upgrades} />
            </Grid>
        </Grid>
    );
}