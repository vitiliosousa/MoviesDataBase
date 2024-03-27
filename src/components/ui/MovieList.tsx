import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./button";

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = (props) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleDetailsClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };


  return (
    <>
      <div className="flex flex-wrap items-center justify-center">
        {props.movies.map((movie: Movie, index: number) => (
          <div key={index} className="m-4 flex grid items-center justify-center">
            <Card className="transition duration-300 ease-in-out hover:translate-y-[-10px]">
              <CardHeader>
                <img src={movie.Poster} className="h-72 w-44 rounded-md" alt={movie.Title} />
                <div className="w-44 h-8">
                  <CardTitle className="text-center">{movie.Title}</CardTitle>
                </div>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDetailsClick(movie)}>Details</Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Card className="flex justify-center items-center">
            <CardHeader className="h-full flex items-center justify-center">
              <img src={selectedMovie.Poster} className="rounded-md" alt={selectedMovie.Title} />
            </CardHeader>
            <CardContent className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl text-center">{selectedMovie.Title}</h1>
                <p>Year: {selectedMovie.Year}</p>
                <p>imdbID:{selectedMovie.imdbID}</p>
                <Button onClick={() => setSelectedMovie(null)}>Close</Button>
              </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MovieList;
