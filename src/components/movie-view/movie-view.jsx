import {Col, Row, Button} from "react-bootstrap";

export const MovieView = ({movieData, onBackClick}) => {
    return (
        <Row className="justify-content-center align-items-center">
            <Col md={6}>
                <img className="w-100" src={movieData.ImagePath} />
            </Col>
            <Col md={6}>
                <div>
                    <span>Title: </span>
                    <span>{movieData.Title}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movieData.Description}</span>
                </div>
                <div>
                    <span>Genre: </span>
                    <span>{movieData.Genre.Name}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movieData.Director.Name}</span>
                </div>
                <Button variant="primary" type="submit" onClick={onBackClick} className="btn btn-primary" style={{ cursor: "pointer" }}>Back</Button>
            </Col>
        </Row>
    );
};