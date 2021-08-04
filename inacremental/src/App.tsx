import React, { useState } from 'react';
import './App.css';
import * as data  from './assets/Resources.json'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { MembersPageComponent } from './components/MemberPage';
import { nanoid } from 'nanoid';
import VariableStore, { Member } from './services/VariableStore';
import { makeStyles, Button, SwipeableDrawer, List, ListItem, ListItemText, AppBar, Toolbar, Container } from '@material-ui/core';

/*
  General layout of the app. contains navigation, main gameplay and menus
*/
//material-ui in file styling. this functions just like scss/sass
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: 'flex',
  }
}));
//the application needs to rerender for every increment of a resource, but also every new resource that is made
const App: React.FC = () => {
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

  const generateRoutes = (members: Member[]) => {
    return(
      <Switch>
        {
          members.map(member => {
            console.log(member.name)
            return <Route key={nanoid()} exact path={`/${member.name}`} render={() => <MembersPageComponent/>}/>
          })
        }
      </Switch>
    );
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
    </div>)
  }

  //move the appbar and drawer into the navbar component and fix padding there.
  //currently the appbar overlaps with the content, making it partially invisible
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Button onClick={toggleDrawer('left', true)}>Select member</Button>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {generateLinks(data.members)}
        </SwipeableDrawer>
        <div className={classes.appBarSpacer}/>
        <main className={classes.content}>
          <Container className={classes.container}>
            {generateRoutes(data.members)}
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
