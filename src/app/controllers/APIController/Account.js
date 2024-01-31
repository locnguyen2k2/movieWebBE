import userModel from '../../models/userModel';
import permissionModel from '../../models/permissionModel';
import roleModel from '../../models/roleModel';
import helpers from '../../controllers/helperController';
import bcrypt from 'bcryptjs';
import JWTAction from '../../middlewares/JWTAction';

const login = async (req, res) => {
    if (req.method === "POST") {
        if (req.cookies.jwt) {
            return res.status(200).json({
                error: 1,
                message: "User has been logged in"
            })
        } else {
            let { username, password } = req.body;
            if (username && password && username != '' && password != '') {
                const users = await userModel.listUser();
                const user = helpers.checkUserExists(username, users);
                if (!user) {
                    return res.status(200).json({
                        error: 0,
                        message: "User not found"
                    })
                } else {
                    const passwordHash = bcrypt.compareSync(password, user.password);
                    if (passwordHash == false) {
                        return res.status(200).json({
                            error: 0,
                            message: "Password is incorrect"
                        })
                    } else {
                        const permission = await permissionModel.getPermissionByUsername(username);
                        const userInfo = await userModel.getDetailUser(req.body.username);
                        userInfo.permission = {};
                        for (let i = 0; i < permission.length; i++) {
                            let role = await roleModel.getRoleByID(permission[i].roleID);
                            userInfo.permission[role.role] = true;
                        }
                        delete userInfo.password
                        delete userInfo.token;
                        delete userInfo.refresh_token;
                        await userModel.updateToken("", "", userInfo.username);
                        let token = JWTAction.createJWT({ exp: Math.floor(Date.now() / 1000) + (60 * 60), user: userInfo });
                        let refreshToken = JWTAction.createJWT({ exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), user: userInfo });
                        await userModel.updateToken(token, refreshToken, userInfo.username);
                        res.cookie('jwt', token,
                            {
                                
                            }
                        );
                        return res.status(200).json({
                            error: 1,
                            data: userInfo,
                            message: "Login successfully",
                        })
                    }
                }
            }
            else {
                return res.status(200).json({
                    error: 0,
                    message: "Missing required fields"
                })
            }
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "Method is not supported"
        })
    }
}

const checkLogin = async (req, res) => {
    if (req.cookies.jwt) {
        let token = req.cookies.jwt;
        if (JWTAction.verifyJWT(token) == false) {
            res.clearCookie('token')
            return res.status(200).json({
                error: 0,
                message: "Token is invalid"
            })
        } else {
            return res.status(200).json({
                error: 1,
                data: JWTAction.verifyJWT(token).user,
                message: "User has been logged in"
            })
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "User has not logged in"
        })
    }
}

const logout = async (req, res) => {
    if (req.cookies.jwt) {
        res.clearCookie('jwt');
        return res.status(200).json({
            error: 1,
            message: "Logout successfully"
        });
    } else {
        return res.status(200).json({
            error: 0,
            message: "User has not logged in"
        });
    }
}

export {
    login,
    logout,
    checkLogin
}