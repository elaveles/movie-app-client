import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function MovieCard({ movie }) {
    const { _id, title, director, year, description, genre } = movie;
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleViewDetails = () => {
        if (!user || !user.id) {
            navigate('/login');
        }
    };

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

                {user && user.id ? (
                    <Link to={`/movies/${_id}`}>
                        <Button variant="danger">View Details</Button>
                    </Link>
                ) : (
                    <Button variant="warning" onClick={handleViewDetails}>
                        Login to View Details
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}
