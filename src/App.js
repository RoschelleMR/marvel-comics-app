import React from 'react'
import {Link, Route, Routes} from 'react-router-dom';

import AppHeader from './components/AppHeader';

import Home from './pages/Home';
import Series from './pages/Series'

import './assets/css/App.css';


// ----------------------------NOTES ---------------------------
// Main-Notes: 1. More comics as user scrolls down
//             2. Filtering the comics (eg.latest,oldest,A-Z,Z-A)

// Side-Note: 1. Maybe make the searching for specific titles more refined
//            2. Implement autocomplete on searhing
// ------------------------END OF NOTES--------------------------




function App() {

  return (
    <div className="App">
     
      <AppHeader/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/series/:id" element={<Series/>}/>
      </Routes>
    </div>
  );
}

export default App;
