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
      <Route exact path="/" Component={Home}/>
      <Route exact path="/search" Component={Search}/>
      <Route exact path="/profiles" Component={Profiles}/>
      <Route exact path='/Cloud' Component={StorageComponent}/>
    </Routes>
  </ThemeProvider>
    
    
  </BrowserRouter>
)
export default App;