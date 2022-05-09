import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/home';
import Post from './pages/post/view';
import Profile from './pages/profile';
import Magazine from './pages/magazine';
import TopTags from './pages/topTags';
import { WithApolloProvider } from './utility/WithApolloProvider';


export const AppContext = React.createContext(null);

function App() {
  const [ store, setStore ] = useState('default');
  useEffect(() => {
    document.title = 'Саак'
  }, [])
  return (
    <AppContext.Provider value={{ store, setStore }}>
      <WithApolloProvider>
        <div className='caak-main-wrapper'>
          <BrowserRouter>
            <NavbarNew/>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/post/view/:id' element={<Post/>}/>
              <Route path='/profile/:id' element={<Profile/>}/>
              <Route path='/magazine/:id' element={<Magazine/>}/>
              <Route path='/tags/:id' element={<TopTags/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </WithApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
