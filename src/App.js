import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavBar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import MovieView from './pages/MovieView';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Error from './pages/Error';

import './App.css';
import {UserProvider} from './context/UserContext';

function App() {

    const [user, setUser] = useState({
      id: null
    });

    const unsetUser = () => {

      localStorage.clear();

    };

    useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data.user !== "undefined") {

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });

      } else {

        setUser({
          id: null
        });

      }

    })

    }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/movies/:movieId" element={<MovieView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;