import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminView({ moviesData }) {
    const navigate = useNavigate();

    const handleAddMovie = () => {
        navigate('/add');
    };

    return (
        <Container>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <Button variant="primary" onClick={handleAddMovie} className="mb-3">
                Add Movie
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {moviesData.length > 0 ? (
                        moviesData.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie._id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.year}</td>
                                <td>{movie.description}</td>
                                <td>{movie.genre}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">No movies available.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}
