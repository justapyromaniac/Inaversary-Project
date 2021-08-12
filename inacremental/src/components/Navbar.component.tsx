import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Generation } from '../services/VariableStore';
import * as data  from '../assets/Resources.json'
import { GeneratorListItem } from './GeneratorListItem.component';
import { 
    makeStyles, 
    Button, 
    SwipeableDrawer, 
    AppBar, 
    Toolbar, 
    List, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 340,
        
        overflowX: 'hidden',
    },
    fullList: {
        width: 'auto',
    },
    toolBar: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
}));

//top bar of the page layout
export const NavbarComponent: React.FC = () => {
    const anchor = "right";
    const classes = useStyles();
    const [state, setState] = useState({
        right: false,
    });
    
    const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const generateMemberList = (generations: Generation[]) => {
        return(
            <List>
                {
                    generations.map(generation => {
                        return(
                            <GeneratorListItem key={nanoid()} generation={generation} anchor={anchor} toggleDrawer={toggleDrawer}/>
                        );
                    })
                }
            </List>
        );
    } 

    return(
        <AppBar>
            <Toolbar className={classes.toolBar}>
                <Button onClick={toggleDrawer(anchor, true)}>Select member</Button>
            </Toolbar>
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
                <div
                    className={classes.list}
                    role="presentation"
                    //onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                >
                    {generateMemberList(data.generations)}
                </div>
            </SwipeableDrawer>
        </AppBar>
    );
}