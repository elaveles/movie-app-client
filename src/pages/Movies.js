import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Movies() {
    const { user } = useContext(UserContext);
    const [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`);
                const data = await response.json();
                setMoviesData(data.movies || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    // Friendly message when not logged in
    if (!user.id) {
        return (
            <Container className="mt-5 text-center">
                <h1>Welcome to our Movie Catalog!</h1>
                <p>It looks like you’re not logged in. Please log in to explore our amazing movies.</p>
                <Link to="/login">
                    <Button variant="primary">Log In to Discover More</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="mt-5 text-center">
            {user.isAdmin ? (
                <AdminView moviesData={moviesData} />
            ) : (
                <UserView moviesData={moviesData} />
            )}
        </Container>
    );
}
