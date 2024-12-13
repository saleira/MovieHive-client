import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Button, Col } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) return;

        const fetchMovies = async () => {
            try {
                const response = await fetch("https://movie-hive-ee3949a892be.herokuapp.com/movies", {
                    headers: {Authorization: `Bearer ${token}`}
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const movies = await response.json();
                setMovies(movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, [token]);

    return (
        <Row className="justify-content-center gap-3">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                </Col>
            ) : movies.length === 0 ? (
                <div>The movie list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col key={movie._id} md={3}>
                            <MovieCard
                                movieData={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                    <Button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout</Button>
                </>
            )}
        </Row>
    );
};