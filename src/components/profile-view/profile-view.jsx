import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const ProfileView = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!token) {
            setError("User is not logged in.");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`https://movie-hive-ee3949a892be.herokuapp.com/users/${storedUser.Username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                });

                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUser();
    }, [token]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (error) {
        return <p>Error fetching user data: {error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                <Card className="text-center">
                    <Card.Body>
                    <Card.Title>User Profile</Card.Title>
                    <Card.Text>
                        <strong>Name:</strong> {user.Name} <br />
                        <strong>Username:</strong> {user.Username} <br />
                        <strong>Birthday:</strong> {formatDate(user.Birthday)} <br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => alert("Edit Profile")}>
                        Edit Profile
                    </Button>
                    <Button 
                        variant="danger" 
                        className="ms-2" 
                        onClick={() => alert("Confirm Delete")}
                    >
                        Delete Account
                    </Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
};
