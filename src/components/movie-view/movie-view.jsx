export const MovieView = ({movieData, onBackClick}) => {
    return (
        <div>
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
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};