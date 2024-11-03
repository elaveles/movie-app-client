import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    const { _id, title, director, year, description, genre } = movie;

    return (
        <Card className="mt-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>Director:</Card.Subtitle>
                <Card.Text>{director}</Card.Text>
                <Card.Subtitle>Year:</Card.Subtitle>
                <Card.Text>{year}</Card.Text>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Genre:</Card.Subtitle>
                <Card.Text>{genre}</Card.Text>
                <Link to={`/movies/${_id}`}>
                    <Button variant="danger">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}
