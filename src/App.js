import './styles/index.css';
import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import AddStory from './pages/add/story';
import WithApolloProvider from './utility/WithApolloProvider';
import { AuthProvider } from './context/AuthContext';
import { HeaderProvider } from './context/HeaderContext';
import AllStories from './pages/allstories';
import Footer from './component/footer';
import Search from './pages/search';
import Help from './pages/help';
import Dashboard from './pages/user/Dashboard';
import Settings from './pages/user/Settings';
import Category from './pages/newsCategory';
import PostSaved from './pages/user/saved';
import './assets/fonts/Roboto-Medium.ttf';
import CaakHeader from './component/header';
import PushUp from './component/pushup';
import ProtectedRoute from './component/ProtectedRoute';
import AllTags from './pages/tags';
import Channels from './pages/channels';
import NotFound from './pages/404';
import ServerError from './pages/502';

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
              <HeaderProvider>
                <CaakHeader />
                <Routes>
                  <Route index path="/" element={<Home />} />
                  <Route path="/post/view/:id" element={<Post />} />
                  <Route path="/view/:slug" element={<Post />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="/502" element={<ServerError />} />
                  <Route
                    path="/post/saved"
                    element={
                      <ProtectedRoute>
                        <PostSaved />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/:id"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/magazine/:id"
                    element={
                      <ProtectedRoute>
                        <Magazine />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tags/:slug"
                    element={
                      <ProtectedRoute>
                        <TopTags />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/channel/:id"
                    element={
                      <ProtectedRoute>
                        <Channel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/story/:id"
                    element={
                      <ProtectedRoute>
                        <Story />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/stories"
                    element={
                      <ProtectedRoute>
                        <AllStories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add"
                    element={
                      <ProtectedRoute admin>
                        <Add />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add/post"
                    element={
                      <ProtectedRoute admin>
                        <AddPost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add/linked"
                    element={
                      <ProtectedRoute admin>
                        <AddLink />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add/story"
                    element={
                      <ProtectedRoute admin>
                        <AddStory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit/:id"
                    element={
                      <ProtectedRoute admin>
                        <AddPost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add/:id"
                    element={
                      <ProtectedRoute admin>
                        <AddPost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit/linked/:id"
                    element={
                      <ProtectedRoute admin>
                        <AddLink />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit/post/:id"
                    element={
                      <ProtectedRoute admin>
                        <AddPost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit/story/:id"
                    element={
                      <ProtectedRoute admin>
                        <AddStory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <ProtectedRoute>
                        <Search />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <ProtectedRoute>
                        <Help />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/category/:slug"
                    element={
                      <ProtectedRoute>
                        <Category />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/:id"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings/:id"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tags"
                    element={
                      <ProtectedRoute>
                        <AllTags />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/channels"
                    element={
                      <ProtectedRoute>
                        <Channels />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </HeaderProvider>
              <Footer />
              <PushUp />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </WithApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
