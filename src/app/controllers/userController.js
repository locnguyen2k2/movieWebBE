import userModel from '../models/userModel.js';
import permissionModel from '../models/permissionModel.js';
import roleModel from '../models/roleModel.js';
import helpers from './helperController.js';
import bcrypt from 'bcryptjs';

const data = {};
data.session = {};
const addUser = async (req, res) => {
    data.sub_content = 'users/newUser';
    data.content = 'create-user-form';
    data.title = 'Tạo tài khoản';
    data.items = [];
    if (req.session.user) {
        data.session.user = req.session.user;
    } else {
        delete data.session.user;
    }
    if (req.method === 'POST' && req.body) {
        if (
            req.body.username != null
            && req.body.fname != null
            && req.body.lname != null
            && req.body.gender != null
            && req.body.birthday != null
            && req.body.address != null
            && req.body.phone != null
            && req.body.email != null
            && req.body.password != null
            && req.body.passwordConfirmation != null
        ) {
            const users = await userModel.listUser();
            const result = helpers.checkUserExists(req.body.username, users) ? true : false;
            if (result === false) {
                if (req.body.password === req.body.passwordConfirmation) {
                    const user = req.body;
                    const fname = user.fname;
                    const lname = user.lname;
                    const gender = user.gender;
                    const birthday = user.birthday;
                    const address = user.address;
                    const phone = user.phone;
                    const email = user.email;
                    const username = user.username;
                    const password = bcrypt.hashSync(user.password, 12);
                    await userModel.addUser(fname, lname, gender, birthday, address, phone, email, username, password);
                    const userID = await userModel.getDetailUser(username);
                    await permissionModel.addPermission(userID.id, 1);
                    return res.redirect('/list-user');
                } else {
                    return res.render('layouts/error', { data: { sub_content: "404" } })
                }
            } else {
                return res.render('layouts/error', { data: { sub_content: "404" } })
            }
        } else {
            return res.render('layouts/error', { data: { sub_content: "404" } })
        }
    }
    return res.render('layouts/main', { data: data });
}

const updateUser = async (req, res) => {
    data.sub_content = 'users/updateUser';
    data.content = 'update-user-form';
    data.title = 'Cập nhật tài khoản';
    if (req.session.user) {
        data.session.user = req.session.user;
        if (req.method === 'POST' && req.body) {
            let user = req.body;
            if (req.session.user.permission.admin) {
                if (
                    user.username != null
                    && user.fname != null
                    && user.lname != null
                    && user.gender != null
                    && user.birthday != null
                    && user.address != null
                    && user.phone != null
                    && user.email != null
                ) {

                    const fname = user.fname;
                    const lname = user.lname;
                    const gender = user.gender;
                    const birthday = user.birthday;
                    const address = user.address;
                    const phone = user.phone;
                    const email = user.email;
                    const username = user.username;
                    await userModel.updateUser(username, fname, lname, gender, birthday, address, phone, email);
                }
            } else if (user.username == req.session.user.username) {
                if (
                    user.username != null
                    && user.fname != null
                    && user.lname != null
                    && user.gender != null
                    && user.birthday != null
                    && user.address != null
                    && user.phone != null
                    && user.email != null
                ) {
                    const fname = user.fname;
                    const lname = user.lname;
                    const gender = user.gender;
                    const birthday = user.birthday;
                    const address = user.address;
                    const phone = user.phone;
                    const email = user.email;
                    const username = user.username;
                    await userModel.updateUser(username, fname, lname, gender, birthday, address, phone, email);
                }
            }
            return res.redirect('/list-user');
        }
        if (req.params.username && await userModel.getDetailUser(req.params.username)) {
            if (req.session.user.permission.admin) {
                data.user = await userModel.getDetailUser(req.params.username);
            } else {
                if (req.params.username == req.session.user.username) {
                    data.user = await userModel.getDetailUser(req.params.username);
                } else {
                    return res.redirect('/update-user/' + req.session.user.username);
                }
            }
            if (data.user) {
                data.permissions = await permissionModel.getPermissionByUsername(data.user.username);
                data.user.birthday = data.user.birthday.toISOString().slice(0, 10);
                return res.render('layouts/main', { data: data });
            }
        }
    } else {
        if (data.session.user) {
            delete data.session.user;
        }
        res.redirect('/login');
    }
}

const listUser = async (req, res) => {
    const listUser = await userModel.listUser();
    if (req.session.user) {
        data.session = req.session;
    } else {
        delete data.session.user;
    }
    data.content = 'list-user';
    data.title = 'Danh sách tài khoản';
    data.sub_content = 'users/listUser';
    data.attrs = ['fname', 'lname', 'gender', 'email', 'address'];
    data.cols = ['Họ', 'Tên', 'Phái', 'Email', 'Địa chỉ', 'Cấu hình'];
    data.total = listUser.length;
    data.page = req.query.page ? parseInt(req.query.page) : 1;
    data.items = listUser.slice((data.page - 1) * 5, data.page * 5);
    return res.render('layouts/main', { data: data });
}

const detailUser = async (req, res) => {
    data.content = 'detail-user';
    if (req.session.user) {
        data.session.user = req.session.user;
        data.sub_content = 'users/detailUser';
        data.title = 'Chi tiết tài khoản';
        if (req.query.username && await userModel.getDetailUser(req.query.username)) {
            if (req.session.user.permission.admin || req.query.username == req.session.user.username) {
                const listPermission = await permissionModel.getPermissionByUsername(req.query.username);
                data.item = await userModel.getDetailUser(req.query.username);
                data.item.permission = [];
                for (let i = 0; i < listPermission.length; i++) {
                    const roleName = await roleModel.getRoleByID(listPermission[i].roleID);
                    data.item.permission.push(roleName.role);
                }
            } else if (req.query.username != req.session.user.username) {
                return res.redirect('/list-user');
            }
            return res.render('layouts/main', { data: data });
        } else {
            return res.redirect('/list-user');
        }
    } else {
        delete data.session.user;
        res.redirect('/login');
    }
}

const updateUserStatus = async (req, res) => {
    if (req.session.user) {
        data.session.user = req.session.user;
        if (req.params.username && await userModel.getDetailUser(req.params.username)) {
            const user = await userModel.getDetailUser(req.params.username);
            if (req.session.user.permission.admin && user.username != req.session.user.username) {
                const status = user.status == 1 ? 0 : 1;
                await userModel.updateUserStatus(user.username, status);
                return res.redirect('/list-user');
            } else if (user.username == req.session.user.username && !req.session.user.permission.admin) {
                const status = user.status == 1 ? 0 : 1;
                await userModel.updateUserStatus(user.username, status);
                return res.redirect('/logout');
            } else {
                return res.redirect('/list-user');
            }
        }
    } else {
        delete data.session.user;
        res.redirect('/login');
    }
}

const login = async (req, res) => {
    data.sub_content = 'users/login';
    data.content = 'login-user-form';
    data.title = 'Đăng nhập';
    data.items = [];
    if (req.session.user) {
        data.session.user = req.session.user;
        return res.redirect('/');
    } else {
        delete data.session.user;
        if (req.method === "POST") {
            if (req.body.username != null && req.body.password != null) {
                const users = await userModel.listUser();
                const user = helpers.checkUserExists(req.body.username, users);
                if (!user) {
                    return res.render('layouts/error', { data: { sub_content: "404" } })
                } else {
                    const password = bcrypt.compareSync(req.body.password, user.password);
                    if (password == false) {
                        return res.render('layouts/error', { data: { sub_content: "404" } })
                    } else {
                        const permission = await permissionModel.getPermissionByUsername(req.body.username);
                        req.session.user = await userModel.getDetailUser(req.body.username);
                        data.session.user = req.session.user;
                        req.session.user.permission = {};
                        for (let i = 0; i < permission.length; i++) {
                            const role = await roleModel.getRoleByID(permission[i].roleID);
                            req.session.user.permission[role.role] = true;
                        }
                        return res.redirect('/');
                    }
                }
            } else {
                return res.render('layouts/error', { data: { sub_content: "404" } })
            }
        }
    }
    return res.render('layouts/main', { data: data });
}
const logout = (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        delete data.session.user;
        return res.redirect('/login');
    } else {
        return res.redirect('/');
    }
}

export default {
    addUser,
    listUser,
    login,
    updateUser,
    detailUser,
    logout,
    updateUserStatus
}
