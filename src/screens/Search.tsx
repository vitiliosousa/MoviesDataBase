import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "@/components/ui/MovieList";
import {Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious,PaginationEllipsis, PaginationLink} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress"

export function Search() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const search = searchParams.get("q");
        if (!search) return;

        

        const getMoviesRequest = async () => {
            setLoading(true);
            setProgress(0);

            const url = `http://www.omdbapi.com/?s=${search}&apikey=49a8ec5e&page=${currentPage}`;
            
            const response = await fetch(url);
            const responseJson = await response.json();
            console.log(responseJson);
            
            const startTime = Date.now();
        

            const totalTime = 3000; 
    
            const updateProgress = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = (elapsedTime / totalTime) * 100;
                setProgress(progress);
    
                if (progress < 100) {
                    requestAnimationFrame(updateProgress);
                } else {
                    setMovies(responseJson.Search || []);
                    setSearchTerm(search);
                    setLoading(false);}
                };
        
                requestAnimationFrame(updateProgress);
        };

        getMoviesRequest();
        
    }, [searchParams, currentPage]);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="">  
            {movies.length > 0 && (
                     <div className="flex items-center justify-center">
                         <h1 className="text-2xl sm:text-2xl font-bold">Results for "{searchTerm}"</h1>
                     </div>
            )}
            {loading && (
                <div className="flex items-center justify-center flex-col h-[80vh]">
                    <h1 className="text-2xl sm:text-3xl text-center m-10">Loading...</h1>
                    <Progress value={progress} className="w-1/3"/>
                    <h2 className="m-10 text-center">If you not did search nothing, please, search something in the navbar</h2>
                </div>
            )}
            {!loading && (
                <div>
                    <MovieList movies={movies} />
                </div>
            )}
            <div className="flex justify-center mt-4 mb-10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={prevPage}/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={nextPage}/>
                        </PaginationItem>
                    </PaginationContent>    
                </Pagination>                
                </div>
            </div>
        </>
    );
}
