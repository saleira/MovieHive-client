import {Col, Row, Button} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const MovieView = ({movieData}) => {
    const {movieId} = useParams();

    const movie = movieData.find((b) => b._id === movieId)
    return (
        <Row className="align-items-center">
            <Col md={6}>
                <img className="w-100" src={movie.ImagePath} />
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
                <Link to="/">
                    <Button variant="primary" type="submit" className="btn btn-primary" style={{ cursor: "pointer" }}>Back</Button>
                </Link>
            </Col>
        </Row>
    );
};