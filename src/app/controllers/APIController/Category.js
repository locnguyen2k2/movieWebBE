import categoryModel from "../../models/categoryModel";
import JWTAction from "../../middlewares/JWTAction";
const getListCategory = async (req, res) => {
    const categories = await categoryModel.getListCategory();
    return res.status(200).json({
        error: 1,
        message: "Get list category successfully",
        data: categories
    })
}

const getDetailCategory = async (req, res) => {
    let id = parseInt(req.body.id);
    const category = await categoryModel.getDetailCategory(id);
    return res.status(200).json({
        error: 1,
        message: "Get detail category successfully",
        data: category,
    })
}

const updateCategory = async (req, res) => {
    if (req.cookies.jwt) {
        if (req.method === 'POST' && req.body) {
            let decoded = JWTAction.verifyJWT(req.cookies.jwt);
            if (decoded) {
                if (decoded.user.permission.admin) {
                    let data = req.body.data;
                    if (
                        data.name != ""
                        && data.name != undefined
                        && data.id != ""
                        && data.id != undefined
                    ) {
                        if (await categoryModel.getCategoryByName(data.name.trim())) {
                            return res.status(200).json({
                                error: 0,
                                message: "This category already exists!",
                            })
                        } else {
                            await categoryModel.updateCategory(data.id, data.name);
                            return res.status(200).json({
                                error: 1,
                                message: "Update successfull!",
                            })
                        }
                    }
                } else {
                    return res.status(200).json({
                        error: 0,
                        message: "You don't have permission to do this!",
                    })
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "You have to login first!",
                })
            }
        } else {
            return res.status(200).json({
                error: 0,
                message: "You have to login first!",
            })

        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "You have to login first!",
        })

    }
}

const addCategory = async (req, res) => {
    if (req.cookies.jwt) {
        if (req.method === 'POST' && req.body) {
            let decoded = JWTAction.verifyJWT(req.cookies.jwt);
            if (decoded) {
                if (decoded.user.permission.admin) {
                    let data = req.body.data;
                    if (
                        data.name != ""
                        && data.name != undefined
                    ) {
                        if (await categoryModel.getCategoryByName(data.name.trim())) {
                            return res.status(200).json({
                                error: 0,
                                message: "This category already exists!",
                            })
                        } else {
                            await categoryModel.addCategory(data.name);
                            return res.status(200).json({
                                error: 1,
                                message: "Add successfull!",
                            })
                        }
                    }
                } else {
                    return res.status(200).json({
                        error: 0,
                        message: "You don't have permission to do this!",
                    })
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "You have to login first!",
                })
            }
        } else {
            return res.status(200).json({
                error: 0,
                message: "You have to login first!",
            })

        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "You have to login first!",
        })

    }
}

export {
    getListCategory,
    updateCategory,
    getDetailCategory,
    addCategory
}