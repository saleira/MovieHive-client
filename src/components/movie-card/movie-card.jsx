import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movieData }) => {
    return (
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`} className="text-decoration-none">
            <Card className="h-100 movie-card" style={{ width: '18rem', cursor: "pointer"}} variant="link">
                <div className="card-img-container">
                    <Card.Img variant="top" src={movieData.ImagePath} style={{maxHeight: "400px"}} className="card-img"/>
                </div>
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>{movieData.Director.Name}</Card.Text>
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