import connection from "../../configs/connectDB";

const getListCategory = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_category`');
    return rows;
}

const getDetailCategory = async (categoryID) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_category`  WHERE `id` = ?', [categoryID]);

    return rows[0];
}

const getCategoryByName = async (categoryName) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_category`  WHERE `name` = ?', [categoryName]);
    return rows[0];

}

const updateCategory = async (categoryID, categoryName) => {
    const [rows, fields] = await connection.execute('UPDATE `tbl_category` SET `name` = ? WHERE `id` = ?', [categoryName, categoryID]);
    return rows;

}

const addCategory = async (name) => {
    const [rows, fields] = await connection.execute('INSERT INTO `tbl_category`(`name`) VALUES (?)', [name]);
    return rows;

}

export default {
    getListCategory,
    getDetailCategory,
    updateCategory,
    addCategory,
    getCategoryByName
}