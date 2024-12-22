import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import "./movie-card.scss";

export const MovieCard = ({ movieData }) => {
    return (
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`} className="text-decoration-none">
            <Card className="h-100 movie-card" variant="link">
                <div className="card-img-container">
                    <Card.Img variant="top" src={movieData.ImagePath} style={{maxHeight: "400px"}} className="card-img"/>
                </div>
                <Card.Body>
                    <Card.Title className="fs-5 fs-md-4 fs-lg-3">{movieData.Title}</Card.Title>
                    <Card.Text className="fs-6 fs-md-5 fs-lg-4">{movieData.Director.Name}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
    }).isRequired
};