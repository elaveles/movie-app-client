import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function Register() {
    const { user } = useContext(UserContext);
    const notyf = new Notyf();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function registerUser(e) {
        e.preventDefault();
        setIsLoading(true);

        const apiUrl = process.env.REACT_APP_API_URL;
        const fullUrl = `${apiUrl}/users/register`;
    

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const responseText = await response.text();

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                throw new Error('Invalid JSON response from server');
            }

            if (data.message === "Registered Successfully") {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                notyf.success('Registration successful');
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            notyf.error(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsActive(
            email !== "" && 
            password !== "" && 
            confirmPassword !== "" && 
            password === confirmPassword
        );
    }, [email, password, confirmPassword]);

    if (user.id !== null) {
        return <Navigate to="/login" />;
    }

    return (
        <Form onSubmit={registerUser}>
            <h1 className="my-5 text-center">Register</h1>
            
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            
            <Button 
                variant="primary" 
                type="submit" 
                disabled={!isActive || isLoading}
            >
                {isLoading ? 'Registering...' : 'Submit'}
            </Button>
        </Form>
    );
}
