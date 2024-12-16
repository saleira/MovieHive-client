import { Col, Row, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieView = ({ movieData }) => {
    const { movieId } = useParams();
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const movie = movieData.find((b) => b._id === movieId);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://movie-hive-ee3949a892be.herokuapp.com/users/${JSON.parse(localStorage.getItem("user")).Username}`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                setFeedbackMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [storedToken]);

    const handleAddToFavorites = async () => {
        try {
            const response = await fetch(
                `https://movie-hive-ee3949a892be.herokuapp.com/users/${user.Username}/movies/${movie.Title}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add movie to favorites.");
            }

            const updatedUser = { ...user, FavoriteMovies: [...user.FavoriteMovies, movie.Title] };
            setUser(updatedUser);
            setFeedbackMessage(`${movie.Title} added to your favorites!`);
        } catch (error) {
            setFeedbackMessage(error.message);
        }
    };

    const handleRemoveFromFavorites = async () => {
        try {
            const response = await fetch(
                `https://movie-hive-ee3949a892be.herokuapp.com/users/${user.Username}/movies/${movie.Title}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to remove movie from favorites.");
            }

            const updatedUser = { ...user, FavoriteMovies: user.FavoriteMovies.filter((title) => title !== movie.Title) };
            setUser(updatedUser);
            setFeedbackMessage(`${movie.Title} removed from your favorites!`);
        } catch (error) {
            setFeedbackMessage(error.message);
        }
    };

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
        return <div>Loading user data...</div>;
    }

    return (
        <Row className="align-items-center">
            <Col md={6}>
                <img className="w-100" src={movie.ImagePath} alt={`${movie.Title} Poster`} />
            </Col>
            <Col md={6}>
                <div>
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <div>
                    <span>Genre: </span>
                    <span>{movie.Genre.Name}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div className="mt-3">
                    {user.FavoriteMovies.includes(movie.Title) ? (
                        <Button
                            variant="danger"
                            onClick={handleRemoveFromFavorites}
                            style={{ cursor: "pointer" }}
                        >
                            Remove from Favorites
                        </Button>
                    ) : (
                        <Button
                            variant="success"
                            onClick={handleAddToFavorites}
                            style={{ cursor: "pointer" }}
                        >
                            Add to Favorites
                        </Button>
                    )}
                </div>
                {feedbackMessage && (
                    <div className="mt-3">
                        <span style={{ color: feedbackMessage.includes("Failed") ? "red" : "green" }}>
                            {feedbackMessage}
                        </span>
                    </div>
                )}
                <div className="mt-3">
                    <Link to="/">
                        <Button variant="primary" type="submit" className="btn btn-primary" style={{ cursor: "pointer" }}>
                            Back
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>
    );
};
