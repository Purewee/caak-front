import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/home';
import Post from './pages/post/view';
import Profile from './pages/profile';
import Magazine from './pages/magazine';
import TopTags from './pages/topTags';
import Channel from './pages/channel';
import { WithApolloProvider } from './utility/WithApolloProvider';
import {AuthProvider} from "./context/AuthContext";

export const AppContext = React.createContext(null);

function App() {
  const [ store, setStore ] = useState('default');
  
  useEffect(() => {
    document.title = 'Саак'
  }, [])

  return (
    <AppContext.Provider value={{ store, setStore }}>
      <WithApolloProvider>
        <AuthProvider>
          <div className='caak-main-wrapper font-roboto text-[#111111]'>
            <BrowserRouter>
              <NavbarNew/>
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/post/view/:id' element={<Post/>}/>
                <Route path='/profile/:id' element={<Profile/>}/>
                <Route path='/magazine/:id' element={<Magazine/>}/>
                <Route path='/tags/:slug' element={<TopTags/>}/>
                <Route path='/channel/:id' element={<Channel/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </WithApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
