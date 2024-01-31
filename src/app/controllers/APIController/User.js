import userModel from './../../models/userModel';
import permissionModel from '../../models/permissionModel';
import roleModel from '../../models/roleModel';
import helpers from '../../controllers/helperController';
import bcrypt from 'bcryptjs';
import JWTAction from './../../middlewares/JWTAction'
const data = {};
const getListUser = async (req, res) => {
    const users = await userModel.listUser();
    for (let user of users) {
        // delete user.id;
        delete user.username;
        delete user.password;
        delete user.status;
        delete user.created_at;
        delete user.updated_at;
        delete user.token;
        delete user.refresh_token;
    }
    return res.status(200).json({
        error: 1,
        data: users,
    })
}

const getDetailUser = async (req, res) => {
    if (req.cookies.jwt) {
        let userInfo = JWTAction.verifyJWT(req.cookies.jwt);
        if (req.params.username && await userModel.getDetailUser(req.params.username)) {
            if (userInfo.user.permission.admin || req.params.username == userInfo.user.username) {
                const listPermission = await permissionModel.getPermissionByUsername(req.params.username);
                data.item = await userModel.getDetailUser(req.params.username);
                data.item.permission = [];
                for (let i = 0; i < listPermission.length; i++) {
                    const roleName = await roleModel.getRoleByID(listPermission[i].roleID);
                    data.item.permission.push(roleName.role);
                }
                delete data.item.password;
            } else if (req.params.username != userInfo.user.username) {
                return res.status(200).json({
                    error: 0,
                    message: "You don't have permission to access this page"
                });
            }
            return res.status(200).json({
                message: "Get detail user successfully",
                error: 1,
                data: data
            });
        } else {
            return res.status(200).json({
                error: 0,
                message: "User not found"
            });
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "User has not logged in"
        })
    }
}

const addUser = async (req, res) => {
    if (req.method === 'POST' && req.body) {
        let { username, fname, lname, gender, birthday, address, phone, email, password, passwordConfirmation } = req.body;
        if (
            username != ''
            && fname != ''
            && lname != ''
            && gender != ''
            && birthday != ''
            && address != ''
            && phone != ''
            && email != ''
            && password != ''
            && passwordConfirmation != ''
        ) {
            const users = await userModel.listUser();
            const result = helpers.checkUserExists(username, users) ? true : false;
            if (result === false) {
                if (password === passwordConfirmation) {
                    const passwordHash = bcrypt.hashSync(password, 12);
                    await userModel.addUser(fname, lname, gender, birthday, address, phone, email, username, passwordHash);
                    const userID = await userModel.getDetailUser(username);
                    await permissionModel.addPermission(userID.id, 1);
                    let user = await userModel.getDetailUser(username);
                    delete user.password;
                    delete user.passwordConfirmation;
                    delete user.token;
                    delete user.refresh_token;
                    return res.status(200).json({
                        error: 1,
                        message: "Create user successfully",
                        data: user
                    })
                } else {
                    return res.status(200).json({
                        error: 0,
                        message: "Password confirmation is incorrect"
                    })
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "Username is already exists"
                })
            }
        } else {
            return res.status(200).json({
                error: 0,
                message: "Missing required fields"
            })
        }
    }
    return res.status(400).json({
        error: 0,
        message: "Bad request"
    })
}

const editUser = async (req, res) => {
    if (req.cookies.jwt) {
        if (JWTAction.verifyJWT(req.cookies.jwt)) {
            let token = JWTAction.verifyJWT(req.cookies.jwt)
            if (req.method === 'POST' && req.body) {
                let user = req.body.data;
                if (token.user.permission.admin) {
                    if (
                        user.username != ''
                        && user.fname != ''
                        && user.lname != ''
                    ) {
                        const fname = user.fname;
                        const lname = user.lname;
                        const username = user.username;
                        await userModel.updateUserName(username, fname, lname);
                        user = await userModel.getDetailUser(username);
                        delete user.password;
                        delete user.username;
                        delete user.token;
                        delete user.refresh_token;
                        delete user.status;
                        return res.status(200).json({
                            message: "Update user successfully",
                            error: 1,
                            data: user
                        })
                    }
                } else if (user.username == token.user.username) {
                    if (
                        user.username != ''
                        && user.fname != ''
                        && user.lname != ''
                    ) {
                        const fname = user.fname;
                        const lname = user.lname;
                        const username = user.username;
                        await userModel.updateUserName(username, fname, lname);
                        return res.status(200).json({
                            message: "Update user successfully",
                            error: 1,
                            data: user
                        })
                    }
                } else {
                    return res.status(200).json({
                        error: 0,
                        message: "You don't have permission to access this page"
                    });
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "Bad request"
                })
            }
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "User has not logged in"
        })
    }
}

const deleteUser = async (req, res) => {
    if (req.cookies.user) {
        if (req.body.username && await userModel.getDetailUser(req.body.username)) {
            const user = await userModel.getDetailUser(req.body.username);
            if (req.cookies.user.permission.admin && user.username != req.cookies.user.username) {
                const status = user.status == 1 ? 0 : 1;
                await userModel.updateUserStatus(user.username, status);
                return res.status(200).json({
                    message: "Delete user successfully"
                });
            } else if (user.username == req.cookies.user.username && !req.cookies.user.permission.admin) {
                const status = user.status == 1 ? 0 : 1;
                await userModel.updateUserStatus(user.username, status);
                req.cookies.destroy();
                return res.status(200).json({
                    message: "Delete user successfully"
                });
            } else {
                return res.status(403).json({
                    message: "You don't have permission to access this page"
                });
            }
        }
    } else {
        return res.status(400).json({
            message: "User has not logged in"
        })
    }
}

export {
    getListUser,
    getDetailUser,
    addUser,
    editUser,
    deleteUser
}