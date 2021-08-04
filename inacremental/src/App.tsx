import React from 'react';
import './App.css';
import * as data  from './assets/Resources.json'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { MembersPageComponent } from './components/MemberPage';
import { nanoid } from 'nanoid';
import VariableStore, { Member } from './services/VariableStore';

/*
  General layout of the app. contains navigation, main gameplay and menus
*/

//the application needs to rerender for every increment of a resource, but also every new resource that is made
const App: React.FC = () => {

  const handleMemberChange = (member: Member) => { 
    VariableStore.CurrentMember = member;
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
    <div>
      {
        members.map(member => {
          return <button key={nanoid()} onClick={() => handleMemberChange(member)}><Link to={member.name}>{member.name}</Link></button> 
        })
      }
    </div>)
  }

  return (
    <BrowserRouter>
        {generateLinks(data.members)}
        {generateRoutes(data.members)}
    </BrowserRouter>
  );
}

export default App;
