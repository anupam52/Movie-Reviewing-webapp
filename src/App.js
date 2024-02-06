import logo from './logo.svg';
import './App.css';
import Frontpage from './components/Frontpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviePage from './components/MoviePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path = "/" element={<Frontpage/>}/>
      <Route exact path = "/movies" element={<MoviePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
