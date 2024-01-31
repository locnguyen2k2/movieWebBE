import connection from "../../configs/connectDB";

const addImage = async (image, type, path) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_images` (`image`, `type`, `path`) VALUES (?, ?, ?)', [image, type, path]);
    return rows;
}

const getImageByID = async (id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_images` WHERE `id` = ?', [id]);
    return rows[0];
}

const getImage = async (id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_images` WHERE `id` = ?', [id]);
    return rows[0];
}

const getLastImageID = async () => {
    const [rows, fields] = await connection.execute('SELECT `id` FROM `tbl_images` ORDER BY `id` DESC LIMIT 1');
    return rows[0].id;
}

export default {
    getImage,
    addImage,
    getImageByID,
    getLastImageID
}