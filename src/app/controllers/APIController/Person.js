import personModel from '../../models/personModel';
import JWTAction from '../../middlewares/JWTAction';

const updatePerson = async (req, res) => {
    if (req.cookies.jwt) {
        if (req.method === 'POST' && req.body) {
            let person = req.body;
            let id = person.data.personID;
            let decoded = JWTAction.verifyJWT(req.cookies.jwt);
            if (decoded) {
                if (decoded.user.permission.admin) {
                    // console.log(person)
                    if (
                        person.data.fname != ''
                        && person.data.lname != ''
                        && person.data.gender != null
                        && person.data.birthday != ''
                        && person.data.address != ''
                        && person.data.place != ''
                    ) {
                        const fname = person.data.fname;
                        const lname = person.data.lname;
                        const gender = person.data.gender;
                        const birthday = person.data.birthday;
                        const address = person.data.address;
                        const place = person.data.place;
                        await personModel.updatePerson(id, fname, lname, gender, birthday, address, place);
                        return res.status(200).json({
                            error: 1,
                            message: "Update person successfully",
                        })
                    } else {
                        return res.status(200).json({
                            error: 0,
                            message: "Update person failed",
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "You don't have permission to access this page"
                    });
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "You don't have permission to access this page"
                });
            }
        } else {
            return res.status(200).json({
                message: "Bad request"
            })
        }
    } else {
        return res.status(200).json({
            message: "User has not logged in"
        })
    }
}

const addPerson = async (req, res) => {
    if (req.cookies.jwt) {
        if (req.method === 'POST' && req.body) {
            let decoded = JWTAction.verifyJWT(req.cookies.jwt);
            if (decoded) {
                if (decoded.user.permission.admin) {
                    const { data } = req.body
                    if (
                        data.fname != ""
                        && data.lname != ""
                        && data.gender != -1
                        && data.birthday != ""
                        && data.place != ""
                        && data.address != ""
                    ) {
                        await personModel.addPerson(data.fname, data.lname, parseInt(data.gender), data.birthday, data.place, data.address)
                        return res.status(200).json({
                            error: 1,
                            message: "Update successfull!",
                        })
                    } else {
                        return res.status(200).json({
                            error: 0,
                            message: "Update person failed",
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
                    message: "You don't have permission to access this page"
                });
            }
        } else {
            return res.status(200).json({
                message: "Bad request"
            })
        }
    } else {
        return res.status(200).json({
            message: "User has not logged in"
        })
    }
}

const getListPerson = async (req, res) => {
    const data = await personModel.getListPerson();
    return res.status(200).json({
        error: 1,
        message: 'Get list person successfully',
        data: data
    })
}

export {
    updatePerson,
    addPerson,
    getListPerson
}