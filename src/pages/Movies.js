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
                // Log the API URL for debugging
                console.log('Fetching movies from:', `${process.env.REACT_APP_API_URL}/movies/getMovies`);
                
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`, {
                    headers: {
                        'Accept': 'application/json',
                        // Add auth token if required
                        ...(localStorage.getItem('token') && {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        })
                    }
                });

                // Log response status and headers for debugging
                console.log('Response status:', response.status);
                console.log('Response headers:', [...response.headers.entries()]);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Get response as text first
                const text = await response.text();
                console.log('Response text:', text);

                // Try to parse as JSON
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