import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function MovieDetailView() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    return (
        <Container className="mt-5">
            {movie ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Subtitle>Director:</Card.Subtitle>
                        <Card.Text>{movie.director}</Card.Text>
                        <Card.Subtitle>Year:</Card.Subtitle>
                        <Card.Text>{movie.year}</Card.Text>
                        <Card.Subtitle>Description:</Card.Subtitle>
                        <Card.Text>{movie.description}</Card.Text>
                        <Card.Subtitle>Genre:</Card.Subtitle>
                        <Card.Text>{movie.genre}</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading movie details...</p>
            )}
        </Container>
    );
}
