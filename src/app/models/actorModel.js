import connection from "../../configs/connectDB";

const addActor = async (personID) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_actor` (`personID`) VALUES (?)', [personID]);
    return rows;
}

const getDetailActor = async (actorID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_actor` WHERE `id` = ?', [actorID]);
    return rows[0];
}

const getListActor = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_actor`');
    return rows;
}
const getActorByPersonID = async (personID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_actor` WHERE `personID` = ?', [personID]);
    return rows[0];
}
export default {
    getListActor,
    addActor,
    getDetailActor,
    getActorByPersonID
}