import './styles/index.css';
import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/home';
import { Helmet } from 'react-helmet';
import Post from './pages/post/view';
import Profile from './pages/profile';
import Magazine from './pages/magazine';
import TopTags from './pages/topTags';
import Channel from './pages/channel';
import Story from './pages/story';
import Add from './pages/add';
import AddPost from './pages/add/post';
import AddLink from './pages/add/linked';
import WithApolloProvider from './utility/WithApolloProvider';
import { AuthProvider } from './context/AuthContext';
import AllStories from './pages/allstories';
import Footer from './component/footer';
import Search from './pages/search';
import Help from './pages/help';
import Dashboard from './pages/user/Dashboard';
import Settings from './pages/user/Settings';
import Category from './pages/newsCategory';
import PostSaved from './pages/user/saved';
import Notification from './pages/user/notification';
import './assets/fonts/Roboto-Medium.ttf';

export const AppContext = createContext(null);

function App() {
  const [store, setStore] = useState('default');
  const [shown, setShown] = useState(true);

  return (
    <AppContext.Provider value={{ store, setStore, shown, setShown }}>
      <WithApolloProvider>
        <AuthProvider>
          <div className="caak-main-wrapper font-roboto text-[#111111] antialiased">
            <BrowserRouter>
              <Helmet>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
                />
              </Helmet>
              <NavbarNew />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/post/view/:id" element={<Post />} />
                <Route path="/post/saved" element={<PostSaved />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/magazine/:id" element={<Magazine />} />
                <Route path="/tags/:slug" element={<TopTags />} />
                <Route path="/channel/:slug" element={<Channel />} />
                <Route path="/story/:id" element={<Story />} />
                <Route path="/stories" element={<AllStories />} />
                <Route path="/add" element={<Add />} />
                <Route path="/add/post" element={<AddPost />} />
                <Route path="/add/linked" element={<AddLink />} />
                <Route path="/edit/:id" element={<AddPost />} />
                <Route path="/add/:id" element={<AddPost />} />
                <Route path="/search" element={<Search />} />
                <Route path="/help" element={<Help />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/settings/:id" element={<Settings />} />
                <Route path="/notification" element={<Notification />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </WithApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
