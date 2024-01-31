import connection from "../../configs/connectDB";


const addUser = async (fname, lname, gender, birthday, address, phone, email, username, password) => {
    const sql = 'INSERT INTO `tbl_user` (fname, lname, gender, birthday, address, phone, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [fname, lname, gender, birthday, address, phone, email, username, password];
    try {
        const [rows, fields] = await connection.execute(sql, values);
        console.log('User inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

const listUser = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_user`');
    return rows;
}

const getDetailUser = async (username) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_user` WHERE `username` = ?', [username]);
    return rows[0];
}


const updateUser = async (username, fname, lname, gender, birthday, address, phone, email) => {
    return await connection.execute('UPDATE `tbl_user` SET `fname`=? , `lname`=? , `gender`=?, `birthday`=?, `address`=?,`phone`=?, `email`=?  WHERE `username`=?', [fname, lname, gender, birthday, address, phone, email, username]);
}

const updateUserName = async (username, fname, lname) => {
    return await connection.execute('UPDATE `tbl_user` SET `fname`=? , `lname`=? WHERE `username`=?', [fname, lname, username]);
}

const updateUserStatus = async (username, status) => {
    return await connection.execute('UPDATE `tbl_user` SET `status`=? WHERE `username`=?', [status, username]);
}

const getUserByID = async (userID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_user` WHERE `id` = ?', [userID]);
    return rows[0];
}

const updateToken = async (token, refreshToken, username) => {
    return await connection.execute('UPDATE `tbl_user` SET `token`=?, `refresh_token`=? WHERE `username`=?', [token, refreshToken, username]);
}

export default {
    updateToken,
    addUser,
    updateUserName,
    listUser,
    getDetailUser,
    updateUser,
    getUserByID,
    updateUserStatus
}