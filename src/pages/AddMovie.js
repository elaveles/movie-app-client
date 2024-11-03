import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function AddMovie() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  
  const notyf = new Notyf();

  const addMovie = (e) => {
    e.preventDefault();

    if (!user.isAdmin) {
      notyf.error("You are not authorized to add movies.");
      return;
    }

    let token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        director,
        year,
        description,
        genre
      })
    })
    .then(res => {
      if (!res.ok) { 
        return res.json().then(err => {
          throw new Error(err.error || 'Failed to add movie');
        });
      }
      return res.json();
    })
    .then(data => {
      notyf.success('Movie Added Successfully!');
      navigate("/movies");
    })
    .catch(error => {
      console.error('Error:', error);
      notyf.error(error.message);
    });

    setTitle("");
    setDirector("");
    setYear("");
    setDescription("");
    setGenre("");
  };

  return (
    user.id && user.isAdmin ? (
      <>
        <h1 className="my-5 text-center">Add Movie</h1>
        <Form onSubmit={addMovie}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Title" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Director:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Director" 
              required 
              value={director} 
              onChange={e => setDirector(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Year:</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter Year" 
              required 
              value={year} 
              onChange={e => setYear(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control 
              as="textarea" 
              placeholder="Enter Description" 
              required 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Genre" 
              required 
              value={genre} 
              onChange={e => setGenre(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-5">Submit</Button>
        </Form>
      </>
    ) : (
      <Navigate to="/movies" />
    )
  );
}
