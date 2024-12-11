import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick}) => {
    return (
        <Card className="h-100" style={{ width: '18rem', cursor: "pointer"}} onClick={() => onMovieClick(movieData)} variant="link">
            <Card.Img variant="top" src={movieData.ImagePath} />
            <Card.Body>
                <Card.Title>{movieData.Title}</Card.Title>
                <Card.Text>{movieData.Director.Name}</Card.Text>
            </Card.Body>
        </Card>
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};