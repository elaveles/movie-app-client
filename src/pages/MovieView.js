import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Spinner,
    Alert
} from 'react-bootstrap';

export default function MovieDetailView() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`);
                if (!response.ok) {
                    throw new Error('Movie not found');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    Error loading movie details: {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {movie && (
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm">
                            <Card.Header className="bg-dark text-white">
                                <h2 className="mb-0">{movie.title}</h2>
                                <Badge bg="light" text="dark" className="mt-2">
                                    {movie.year}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-4">
                                    <Col sm={4}>
                                        <h6 className="text-muted mb-2">Director</h6>
                                        <p className="fw-bold">{movie.director}</p>
                                    </Col>
                                    <Col sm={8}>
                                        <h6 className="text-muted mb-2">Genre</h6>
                                        <Badge bg="secondary" className="me-2">
                                            {movie.genre}
                                        </Badge>
                                    </Col>
                                </Row>
                                <div>
                                    <h6 className="text-muted mb-2">Description</h6>
                                    <Card.Text className="lh-lg">
                                        {movie.description}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                            <Card.Footer className="bg-light">
                                <small className="text-muted">
                                    Movie ID: {movieId}
                                </small>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}