import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Container, Row, Col, Alert } from 'react-bootstrap';

export default function UserCatalog() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`);
                const data = await response.json();
                setMovies(data.movies || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <Col md={4} key={movie._id} className="mb-4">
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                ) : (
                    <Alert variant="warning" className="w-100 text-center">
                        No Movies Available
                    </Alert>
                )}
            </Row>
        </Container>
    );
}
