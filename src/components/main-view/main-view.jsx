import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {"_id":1,"Title":"The Godfather","Description":"The aging patriarch of an organized crime dynasty transfers control to his reluctant son.","Genre":{"Name":"Crime","Description":"Films that delve into the world of crime and its consequences."},"Director":{"Name":"Francis Ford Coppola","Bio":"An American film director and screenwriter, famous for The Godfather trilogy.","BirthYear":{"$numberInt":"1939"},"DeathYear":null},"ImagePath":"godfather.png","Feature":true},
        {"_id":2,"Title":"La La Land","Description":"A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.","Genre":{"Name":"Drama","Description":"Films focused on realistic narratives and emotional themes."},"Director":{"Name":"Damien Chazelle","Bio":"An American filmmaker known for his focus on music-themed stories.","BirthYear":{"$numberInt":"1985"},"DeathYear":null},"ImagePath":"la_la_land.png","Feature":true},
        {"_id":3,"Title":"Spirited Away","Description":"A young girl becomes trapped in a strange world of spirits and must find her way back home.","Genre":{"Name":"Fantasy","Description":"Films set in imaginative worlds, often involving magic or supernatural elements."},"Director":{"Name":"Hayao Miyazaki","Bio":"A Japanese filmmaker known for his animated masterpieces.","BirthYear":{"$numberInt":"1941"},"DeathYear":null},"ImagePath":"spirited_away.png","Feature":true}
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView
                movieData={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The movie list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movieData={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};