import connection from "../../configs/connectDB";

const addMovie = async (movieTitle, movieDirector, movieDisc) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_movies` (`name`, `director`, `description`) VALUES (?, ?, ? )', [movieTitle, movieDirector, movieDisc]);
    return rows;
}

const deleteMovie = async (movieID) => {
    const [rows1, fields1] = await connection.execute('SELECT * FROM `tbl_movie_image` WHERE `movie_id` = ?', [movieID]);
    if (rows1[0] != null) {
        await connection.execute('DELETE FROM `tbl_movie_image` WHERE `movie_id` = ?', [movieID]);
        await connection.execute('DELETE FROM `tbl_images` WHERE `id` = ?', [rows1[0].image_id]);
    }
    await connection.execute('DELETE FROM `tbl_movie_actors` WHERE `movieID` = ?', [movieID]);
    await connection.execute('DELETE FROM `tbl_movie_category` WHERE `movie_id` = ?', [movieID]);
    await connection.execute('DELETE FROM `tbl_movies` WHERE `id` = ?', [movieID]);
}
const getListMovie = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movies`');
    return rows;
}

const getDetailMovie = async (movieID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movies` WHERE `id` = ?', [movieID]);
    return rows[0];
}
const getLastMovieID = async () => {
    const [rows, fields] = await connection.execute('SELECT `id` FROM `tbl_movies` ORDER BY `id` DESC LIMIT 1');
    return rows[0].id;
}

const getTrenddingMovies = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movies` WHERE `trendding` = 1 ORDER BY `id`');
    return rows;
}

const getNewMovies = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movies` ORDER BY `id`');
    return rows;
}

const getListMovieFromTo = async (from, to) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movies` LIMIT ?, ?', [from, to]);
    return rows;
}

const updateMovie = async (movieID, movieTitle, movieDisc, trendding = -1) => {
    if (trendding == -1) {
        const [rows, fields] = await connection.execute('UPDATE `tbl_movies` SET `name` = ?, `description` = ? WHERE `id` = ?', [movieTitle, movieDisc, movieID]);
        return rows;
    } else {
        const [rows, fields] = await connection.execute('UPDATE `tbl_movies` SET `name` = ?, `description` = ?, `trendding` = ? WHERE `id` = ?', [movieTitle, movieDisc, trendding, movieID]);
        return rows;
    }
}

const updateMovieDirector = async (movieID, movieDirector) => {
    const [rows, fields] = await connection.execute('UPDATE `tbl_movies` SET `director` = ? WHERE `id` = ?', [movieDirector, movieID]);
    return rows;
}

export default {
    addMovie,
    updateMovie,
    getListMovie,
    getDetailMovie,
    getLastMovieID,
    getTrenddingMovies,
    deleteMovie,
    getNewMovies,
    getListMovieFromTo,
    updateMovieDirector
}