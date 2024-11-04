import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import { Container } from 'react-bootstrap';

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

    return (
        <Container className="mt-5 text-center">
            <h1>Welcome to our Movie Catalog!</h1>
            {moviesData.length > 0 ? (
                <>
                    {user.isAdmin ? (
                        <AdminView moviesData={moviesData} />
                    ) : (
                        <UserView moviesData={moviesData} />
                    )}
                </>
            ) : (
                <p>No movies available at the moment. Please check back later.</p>
            )}
        </Container>
    );
}
