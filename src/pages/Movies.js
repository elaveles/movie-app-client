import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import { Container, Alert } from 'react-bootstrap';

export default function Movies() {
    const { user } = useContext(UserContext);
    const [moviesData, setMoviesData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`, {
                    headers: {
                        'Accept': 'application/json',
                        ...(localStorage.getItem('token') && {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        })
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const text = await response.text();

                const data = JSON.parse(text);
                setMoviesData(data.movies || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (isLoading) {
        return (
            <Container className="mt-5 text-center">
                <h2>Loading movies...</h2>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    Error loading movies: {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5 text-center">
            {moviesData.length > 0 ? (
                <>
                    {user.isAdmin ? (
                        <AdminView moviesData={moviesData} />
                    ) : (
                    <>
                        <h1>Welcome to our Movie Catalog!</h1>
                        <UserView moviesData={moviesData} />
                    </>
                    )}
                </>
            ) : (
                <p>No movies available at the moment. Please check back later.</p>
            )}
        </Container>
    );
}