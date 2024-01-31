import connection from "../../configs/connectDB";

const getListDirector = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_director`');
    return rows;
}

const getDetailDirector = async (directorID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_director`  WHERE `id` = ?', [directorID]);

    return rows[0];
}

const getDetailDirectorByPersonID = async (personID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_director`  WHERE `personID` = ?', [personID]);

    return rows[0];
}

const addDirector = async (personID) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_director` (`personID`) VALUES (?)', [personID]);
    return rows;
}

export default {
    getListDirector,
    getDetailDirector,
    getDetailDirectorByPersonID,
    addDirector
}