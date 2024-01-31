import connection from "../../configs/connectDB";

const addPerson = async (fname, lname, gender, birthday, place, address, created_at) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_person` (`fname`, `lname`, `gender`, `birthday`, `place`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?,?, ?)', [fname, lname, gender, birthday, place, address, created_at]);
    return rows;
}

const getPersonByCreated = async (created_at) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_person` WHERE `created_at` = ?', [created_at]);
    return rows[0];
}

const getPerson = async (id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_person` WHERE `id` = ?', [id]);
    return rows[0];
}

const getListPerson = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_person`');
    return rows;
}

const updatePerson = async (id, fname, lname, gender, birthday, address, place) => {
    return await connection.execute('UPDATE `tbl_person` SET `fname`=? , `lname`=? , `gender`=?, `birthday`=?, `address`=?,`place`=? WHERE `id`=?', [fname, lname, gender, birthday, address, place, id]);
}

export default {
    getPerson,
    getListPerson,
    addPerson,
    updatePerson,
    getPersonByCreated
}