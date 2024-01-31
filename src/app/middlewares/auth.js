import JWTAction from "./JWTAction";

const authAdmin = async (req, res, next) => {
    if (req.cookies.jwt) {
        let token = req.cookies.jwt;
        try {
            let decoded = JWTAction.verifyJWT(token);
            if (decoded == false) {
                return res.status(200).json({
                    error: 0,
                    message: "Token is invalid"
                })
            }
            if (decoded.user.permission.admin) {
                next();
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "You don't have permission to access this page"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                error: 0,
                message: "Unauthorized"
            })
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "Token is required"
        })
    }
}

const authUser = async (req, res, next) => {
    if (req.cookies.jwt) {
        let token = req.cookies.jwt;
        try {
            let decoded = JWTAction.verifyJWT(token);
            if (decoded == false) {
                return res.status(200).json({
                    error: 0,
                    message: "Token is invalid"
                })
            }
            next();
        } catch (error) {
            return res.status(200).json({
                error: 0,
                message: "Unauthorized"
            })
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "Token is required"
        })
    }
}

export default {
    authAdmin,
    authUser
}
