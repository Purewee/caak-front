import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarNew from './component/navigation/navbar';
import Home from './pages/Home';
import Post from './pages/post/view';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarNew/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/post/view' element={<Post/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
