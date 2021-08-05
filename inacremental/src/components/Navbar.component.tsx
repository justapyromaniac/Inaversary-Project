import { nanoid } from 'nanoid';
import { useState } from 'react';
import VariableStore, { Member } from '../services/VariableStore';
import * as data  from '../assets/Resources.json'
import { Link } from 'react-router-dom';
import { 
    makeStyles, 
    Button, 
    SwipeableDrawer, 
    AppBar, 
    Toolbar, 
    List, 
    ListItem, 
    ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
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

    const handleMemberChange = (member: Member) => { 
        VariableStore.CurrentMember = member;
        toggleDrawer(anchor, false)
        //setState({anchor: false });
    }

    const generateLinks = (members: Member[]) => {
        return( 
            <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                {
                    members.map(member => {
                        return (
                            <ListItem key={nanoid()} button component={Link} to={member.name} onClick={() => handleMemberChange(member)}>
                                <ListItemText primary={member.name}/>
                            </ListItem>
                        );
                    })
                }
                </List>
            </div>
        )
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
                {generateLinks(data.members)}
            </SwipeableDrawer>
        </AppBar>
    );
}