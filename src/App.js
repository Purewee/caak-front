import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/home';
import Post from './pages/post/view';
import Profile from './pages/profile';
import Magazine from './pages/magazine';
import React, {useState} from 'react';
export const AppContext = React.createContext(null);

function App() {
  const [ store, setStore ] = useState('default');
  return (
    <AppContext.Provider value={{ store, setStore }}>
      <BrowserRouter>
        <NavbarNew/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/post/view/:id' element={<Post/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/magazine/:id' element={<Magazine/>}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
