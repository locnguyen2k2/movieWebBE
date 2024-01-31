import connection from "../../configs/connectDB";

const listRole = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_role`');
    return rows;
}

const getRoleByID = async (id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_role` WHERE `id` = ?', [id]);
    return rows[0];
}

export default {
    listRole,
    getRoleByID
}