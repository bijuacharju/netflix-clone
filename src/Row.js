import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: { autoplay: 1 },
    };
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => {
                    return (
                        <div
                            className={`movieCard ${
                                isLargeRow ? "largeCard" : "smallCard"
                            }`}
                            key={movie.id}
                            onClick={() => {
                                handleClick(movie);
                            }}
                        >
                            <img
                                className={`row_poster ${
                                    isLargeRow && "row__posterLarge"
                                }`}
                                src={`${base_url}${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={movie.name}
                                key={movie.id}
                                title={movie.name || movie.original_title}
                            />
                            <div className="movieCard__movieName">
                                <p className="movieTitle">
                                    {movie.name ||
                                        movie.original_title ||
                                        movie.title}
                                </p>
                                <p>{`Rating: ${movie.vote_average} / 10`}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
