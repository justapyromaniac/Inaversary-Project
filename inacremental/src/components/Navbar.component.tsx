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
}));

//top bar of the page layout
export const NavbarComponent: React.FC = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        left: false,
    });
    
    const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const handleMemberChange = (member: Member) => { 
        VariableStore.CurrentMember = member;
        setState({"left": false });
    }

    const generateLinks = (members: Member[]) => {
        return( 
            <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer("left", false)}
            onKeyDown={toggleDrawer("left", false)}
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
            <Toolbar>
                <Button onClick={toggleDrawer('left', true)}>Select member</Button>
            </Toolbar>
            <SwipeableDrawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {generateLinks(data.members)}
            </SwipeableDrawer>
        </AppBar>
    );
}