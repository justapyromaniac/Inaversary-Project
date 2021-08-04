import React from 'react';
import './App.css';
import CountersComponent from './components/Counters.component';
import IncrementButtonComponent from './components/IncrementButton.component';

/*
  General layout of the app. contains navigation, main gameplay and menus
*/

//the application needs to rerender for every increment of a resource, but also every new resource that is made
function App() {
  return (
    <div>
      <IncrementButtonComponent/>
      <CountersComponent/>
    </div>
  );
}

export default App;
