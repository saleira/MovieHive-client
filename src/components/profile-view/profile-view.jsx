import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form, Modal, ListGroup, Spinner } from "react-bootstrap";
import "./profile-view.scss"

export const ProfileView = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const [pendingMovieRemovals, setPendingMovieRemovals] = useState([]);
    const [pendingAccountDeletion, setPendingAccountDeletion] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!token) {
            setError("User is not logged in.");
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setConfirmationTitle("Confirm Update");
        setConfirmationMessage("Are you sure you want to save these changes?");
        setShowConfirmation(true);
        setPendingUpdate(true);
        setPendingAccountDeletion(false);
    };

    const handleDeleteAccount = () => {
        setConfirmationTitle("Confirm Account Deletion");
        setConfirmationMessage("Are you sure you want to delete your account?");
        setShowConfirmation(true);
        setPendingUpdate(false);
        setPendingAccountDeletion(true);
    };

    const handleRemoveMovie = (movieTitle) => {
        setPendingMovieRemovals((prev) => [...prev, movieTitle]);
    };

    const handleConfirmAction = async () => {
        try {
            if (pendingAccountDeletion) {
                const response = await fetch(`https://movie-hive-ee3949a892be.herokuapp.com/users/${storedUser.Username}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to delete account.");
                }

                localStorage.clear();
                setConfirmationMessage("Your account has been successfully deleted.");
                window.location.href = "/login"
                return;
            }

            if (pendingUpdate) {
                const updateResponse = await fetch(`https://movie-hive-ee3949a892be.herokuapp.com/users/${storedUser.Username}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Email: user.Email, Birthday: user.Birthday }),
                });

                if (!updateResponse.ok) {
                    throw new Error("Failed to update user details.");
                }
            }

            if (pendingMovieRemovals.length > 0) {
                const updatedFavoriteMovies = [...user.FavoriteMovies];
                for (const movieTitle of pendingMovieRemovals) {
                    const movieResponse = await fetch(`https://movie-hive-ee3949a892be.herokuapp.com/users/${storedUser.Username}/movies/${movieTitle}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!movieResponse.ok) {
                        throw new Error("Failed to remove movie from favorites.");
                    }
                    const index = updatedFavoriteMovies.indexOf(movieTitle);
                    if (index !== -1) updatedFavoriteMovies.splice(index, 1);
                }

                setUser({
                    ...user,
                    FavoriteMovies: updatedFavoriteMovies,
                });
                setPendingMovieRemovals([]);
            }

            setConfirmationMessage("Your changes have been successfully saved.");
        } catch (error) {
            setConfirmationMessage(error.message);
        } finally {
            setShowConfirmation(false);
            setPendingUpdate(false);
            setPendingAccountDeletion(false);
        }
    };


    if (error) {
        return <p>Error fetching user data: {error}</p>;
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
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
                            <Card.Title className="mb-4">{user.Name} profile</Card.Title>
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="d-flex flex-row gap-3 align-items-center mb-3" controlId="formUsername">
                                    <Form.Label className="mb-0">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={user.Username}
                                        disabled
                                        readOnly
                                        className="form-control same-size-input"
                                    />
                                </Form.Group>
                                <Form.Group className="d-flex flex-row gap-3 align-items-center mb-3" controlId="formEmail">
                                    <Form.Label className="mb-0">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={user.Email}
                                        onChange={(e) => setUser({...user, Email: e.target.value})}
                                        required
                                        className="form-control same-size-input"
                                    />
                                </Form.Group>
                                <Form.Group className="d-flex flex-row gap-3 align-items-center mb-3" controlId="formBirthday">
                                    <Form.Label className="mb-0">Birthday</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={user.Birthday.split("T")[0]}
                                        onChange={(e) => setUser({...user, Birthday: e.target.value})}
                                        required
                                        className="form-control same-size-input"
                                    />
                                </Form.Group>

                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Title>Favorite Movies</Card.Title>
                                        {user.FavoriteMovies.filter(
                                            (movie) => !pendingMovieRemovals.includes(movie)
                                        ).length > 0 ? (
                                            <ListGroup>
                                                {user.FavoriteMovies.filter(
                                                    (movie) => !pendingMovieRemovals.includes(movie)
                                                ).map((movie) => (
                                                    <ListGroup.Item
                                                        key={movie}
                                                        className="d-flex justify-content-between align-items-center"
                                                    >
                                                        {movie}
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleRemoveMovie(movie)}
                                                        >
                                                            x
                                                        </Button>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p className="text-center mt-3">You don't have any favorite movies yet.</p>
                                        )}
                                    </Card.Body>
                                </Card>


                                <div className="mt-4">
                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="ms-2"
                                        onClick={handleDeleteAccount}
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{confirmationTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{confirmationMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirmAction}>
                        Confirm
                    </Button>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
