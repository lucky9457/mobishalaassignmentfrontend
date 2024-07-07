import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './Home'
import Search from './components/Search/Search';
import { ThemeProvider } from "./components/ThemeContext"
import StorageComponent from './components/StorageComponent/StorageComponent';
import Profiles from './components/Profiles/Profiles';
import './Home.css';

const App = () => (
  <BrowserRouter>
  <ThemeProvider>
    <Routes>
      <Route exact path='/' Component={StorageComponent}/>
      <Route exact path="/chat" Component={Home}/>
      <Route exact path="/search" Component={Search}/>
      <Route exact path="/profiles" Component={Profiles}/>
      
    </Routes>
  </ThemeProvider>
    
    
  </BrowserRouter>
)
export default App;