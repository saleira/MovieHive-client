
export const MovieView = ({movieData, onBackClick}) => {
    return (
        <div>
            <div>
                <img className="w-50" src={movieData.ImagePath} />
            </div>
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
            <button onClick={onBackClick} className="btn btn-primary" style={{ cursor: "pointer" }}>Back</button>
        </div>
    );
};