import React, { useEffect } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './Home'
import Search from './components/Search/Search';
import { ThemeProvider } from "./components/ThemeContext"
import StorageComponent from './components/StorageComponent/StorageComponent';
import Profiles from './components/Profiles/Profiles';
import VoiceAIComponent from './components/VoiceAIComponent/VoiceAiComponent';
import './Home.css';
import ClientDataset from './components/ClientDataset/ClientDataset';
import ClientProfileView from './components/ClientProfileView/ClientProfileView';
import Login from './components/Login/Login';

const App = () => {
  useEffect(() => {
    document.title = 'LegAi';
  }, []);
  return(
  <BrowserRouter>
  <ThemeProvider>
    <Routes>
      <Route exact path='/login' Component={Login}/>
      <Route exact path="/chat" Component={Home}/>
      <Route exact path='/dataset' Component={StorageComponent}/>
      <Route exact path="/" Component={VoiceAIComponent}/>
      <Route exact path ="/clientDataset" Component={ClientDataset}/>
      <Route exact path="/clientprofile/:id" Component={ClientProfileView}/>
      <Route exact path="/search" Component={Search}/>
      <Route exact path="/profiles" Component={Profiles}/>
      
    </Routes>
  </ThemeProvider>
    
    
  </BrowserRouter>
)}
export default App;