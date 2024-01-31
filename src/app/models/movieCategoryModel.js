import connection from "../../configs/connectDB";

const getListMovieCategoryByMovieID = async (movieID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_category` WHERE `movie_id` = ?', [movieID]);
    return rows;
}

const getListMovieCategoryByCategoryID = async (categoryID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_category`  WHERE `category_id` = ?', [categoryID]);

    return rows[0];
}

const updateMovieCategory = async (id, movieID, categoryID) => {
    const [rows, fields] = await connection.execute('UPDATE `tbl_movie_category` SET `movie_id` = ?, `category_id` = ? WHERE `id` = ?', [movieID, categoryID, id]);
    return rows;
}
const getMovieCategoryByMovieIDCategoryID = async (movieID, categoryID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_category` WHERE `movie_id` = ? AND `category_id` = ?', [movieID, categoryID]);
    return rows[0];
}
const updateMovieCategoryByID = async (id, movieID, categoryID) => {
    const [rows, fields] = await connection.execute('UPDATE `tbl_movie_category` SET `movie_id` = ?, `category_id` = ? WHERE `id` = ?', [movieID, categoryID, id]);
    return rows;

}

const addMovieCategory = async (movieID, categoryID) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_movie_category`(`movie_id`, `category_id`) VALUES (?, ?)', [movieID, categoryID]);
}

const deleteMovieCategoryByID = async (id) => {
    const [rows, fields] = await connection.execute('DELETE FROM `tbl_movie_category` WHERE `id` = ?', [id]);
    return rows;

}

export default {
    getListMovieCategoryByCategoryID,
    getListMovieCategoryByMovieID,
    updateMovieCategory,
    getMovieCategoryByMovieIDCategoryID,
    updateMovieCategoryByID,
    addMovieCategory,
    deleteMovieCategoryByID
}