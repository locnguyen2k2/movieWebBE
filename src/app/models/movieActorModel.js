import connection from "../../configs/connectDB"

const addMovieActor = async (movieID, actorID) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_movie_actors` (`movieID`, `actorID`) VALUES (?, ?)', [movieID, actorID]);
    return rows;
}

const getListMovieActor = async (movieID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_actors` WHERE `movieID` = ?', [movieID]);
    return rows;
}

const updateMovieActorByID = async (movieActorID, movieID, actorID) => {
    const [rows, fields] = await connection.execute('UPDATE `tbl_movie_actors` SET `movieID` = ?, `actorID` = ? WHERE `id` = ?', [movieID, actorID, movieActorID]);
    return rows;
}

const getMovieActorByMovieIDActorID = async (movieID, actorID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_actors` WHERE `movieID` = ? AND `actorID` = ?', [movieID, actorID]);
    return rows[0];
}

const deleteMovieActorByID = async (movieActorID) => {
    const [rows, fields] = await connection.execute('DELETE FROM `tbl_movie_actors` WHERE `id` = ?', [movieActorID]);
    return rows;
}

const getAllMovieActor = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_movie_actors`');
    return rows;

}

export default {
    addMovieActor,
    getListMovieActor,
    updateMovieActorByID,
    getMovieActorByMovieIDActorID,
    deleteMovieActorByID,
    getAllMovieActor
}