const KEY = '49cdd916';

const processMovie = movie => ({
    key: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
});

export default async function fetchMovies(query, page) {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${KEY}`);
        const movies = await response.json();
        return movies.Search.map(processMovie);
}

