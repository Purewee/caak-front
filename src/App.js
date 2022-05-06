import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/Home';
import Post from './pages/post/view';
import Profile from './pages/profile';
import Jor from './pages/jor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarNew/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/post/view' element={<Post/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/magazine/:id' element={<Jor/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
