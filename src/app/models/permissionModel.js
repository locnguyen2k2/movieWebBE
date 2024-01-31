import connection from "../../configs/connectDB";

const getPermission = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_ermission`');
    return rows;
}

const getPermissionByUserID = async (userID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_permission` WHERE `userID` = ?', [userID]);
    return rows;
}

const getPermissionByUsername = async (username) => {
    const [rows, fields] = await connection.execute(
        'SELECT * FROM `tbl_permission`, (SELECT tbl_user.id as user_id FROM `tbl_user` WHERE `username` = ?) AS `tbl_user` WHERE tbl_permission.userID = tbl_user.user_id',
        [username]
    );
    return rows;
}
const addPermission = async (userID, roleID) => {
    const sql = 'INSERT INTO `tbl_permission` (userID, roleID) VALUES (?, ?)';
    const values = [userID, roleID];

    try {
        const [rows, fields] = await connection.execute(sql, values);
        console.log('User inserted successfully');
        return rows;
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

const updatePermission = async (permissionID, userID, roleID) => {
    const sql = 'UPDATE `tbl_permission` SET `userID` = ?, `roleID` = ? WHERE `id` = ?';
    const values = [userID, roleID, permissionID];

    try {
        const [rows, fields] = await connection.execute(sql, values);
        console.log('User updated successfully');
        return rows;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

const getPermissionByID = async (permissionID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_permission` WHERE `id` = ?', [permissionID]);
    return rows[0];
}
export default {
    getPermission,
    getPermissionByUsername,
    getPermissionByUserID,
    getPermissionByID,
    addPermission,
    updatePermission
}