import './App.css';
import './ant.less';
import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/home';
import Post from './pages/post/view';
import Profile from './pages/profile';
import Magazine from './pages/magazine';
import TopTags from './pages/topTags';
import Channel from './pages/channel';
import Story from './pages/story';
import Add from './pages/add';
import WithApolloProvider from './utility/WithApolloProvider';
import WithThemeProvider from './utility/WithThemeProvider';
import { AuthProvider } from './context/AuthContext';
import AllStories from './pages/allstories';
import Footer from './component/footer';
import Search from './pages/search';

export const AppContext = createContext(null);

function App() {
  const [store, setStore] = useState('default');
  const [shown, setShown] = useState(true);

  return (
    <AppContext.Provider value={{ store, setStore, shown, setShown }}>
      <WithThemeProvider>
        <WithApolloProvider>
          <AuthProvider>
            <div className="caak-main-wrapper font-roboto text-[#111111]">
              <BrowserRouter>
                <NavbarNew />
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/post/view/:id" element={<Post />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/magazine/:id" element={<Magazine />} />
                  <Route path="/tags/:slug" element={<TopTags />} />
                  <Route path="/channel/:id" element={<Channel />} />
                  <Route path="/story/:id" element={<Story />} />
                  <Route path="/stories" element={<AllStories />} />
                  <Route path="/add" element={<Add />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/add/:id" element={<Add />} />
                </Routes>
                <Footer />
              </BrowserRouter>
            </div>
          </AuthProvider>
        </WithApolloProvider>
      </WithThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
