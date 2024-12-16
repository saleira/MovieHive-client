import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [loading, setLoading] = useState(false);

    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    useEffect(() => {
        if (!token) return;

        const fetchMovies = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={onLoggedOut} />
            {loading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <Row className="justify-content-center gap-3 mt-6">
                <Routes>
                    <Route 
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/profile"
                        element={user ? <Col><ProfileView /></Col> : <Navigate to="/login" />}
                    />
                    <Route 
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace/>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movieData={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace/>
                                ) : !loading && movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col key={movie._id} md={3}>
                                                <MovieCard movieData={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};