const KEY = '49cdd916';

const detailMovie = dmovie => ({
});

export default async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${KEY}`);
        const movies = await response.json();
        return movies
    } catch (err) {
        return alert('Error retrieving movie details.');
    }

}