import connection from "../../configs/connectDB";

const addMovieImage = async (movieID, imageID) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_movie_image` (`movie_id`, `image_id`) VALUES (?, ?)', [movieID, imageID]);
    return rows;
}

const getMovieImageMovieID = async (id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_image` WHERE `movie_id` = ?', [id]);
    return rows;
}

const getListMovieImage = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_image`');
    return rows;
}

export default {
    addMovieImage,
    getMovieImageMovieID,
    getListMovieImage
}