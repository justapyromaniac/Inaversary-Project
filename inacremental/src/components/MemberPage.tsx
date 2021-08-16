import { Grid, makeStyles, Typography, Box, AppBar, Tabs, Tab } from '@material-ui/core';
import _ from 'lodash';
import VariableStore from '../services/VariableStore';
import { PassiveGenerator } from '../services/Generator';
import { CounterListComponent } from './Counters.component';
import { ActiveGeneratorComponent } from './ActiveGenerator.component';
import { nanoid } from 'nanoid'
import { PassiveGeneratorComponent } from './PassiveGenerator.component';
import ShopComponent from './Shop.component';
import UpgradeComponent from './Upgrade.component';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    tabsRoot: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
    },
    gridContainer: {
        height: '100%',
    },
    gridItem: {
        border: '1px solid black',
        height: '100%',
        textAlign: 'center',
    },
}));


interface TabPabelProps {
    children: React.ReactNode,
    index: number,
    value: number,
}

function TabPanel(props: TabPabelProps) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            {value === index && (
            <div>
                {children}
            </div>
            )}
        </div>
    );
}

function a11yProps(index:number) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export const MembersPageComponent: React.FC = () => {
    const classes = useStyles();
    const currentMember = VariableStore.CurrentMember;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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



    return(
        <Grid container className={classes.gridContainer}>
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
                <div className={classes.tabsRoot}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs"
                        >
                            <Tab label="Shop" {...a11yProps(0)} />
                            <Tab label="Upgrades" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Typography>Shop</Typography>
                        {generateShop()}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography>Upgrades</Typography>
                        {generateUpgrades()}
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    );
}