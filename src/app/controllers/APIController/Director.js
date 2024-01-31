import directorModel from "../../models/directorModel";
import personModel from "../../models/personModel";
import JWTAction from "../../middlewares/JWTAction";
const getListDirector = async (req, res) => {
    try {
        const listDirector = await directorModel.getListDirector();
        const listPerson = await personModel.getListPerson();
        let directors = [];
        listDirector.forEach((director) => {
            const person = listPerson.find((person) => person.id === director.personID);
            director = person;
            director.fullName = person.fname + ' ' + person.lname;
            directors.push(director);
        });
        return res.status(200).json({
            error: 1,
            success: true,
            data: directors,
        });
    } catch (error) {
        return res.status(500).json(
            {
                error: 0,
                success: false,
                message: error.message,
            }
        );
    }
}

const getDetailDirector = async (req, res) => {
    let director = {};
    try {
        const personID = req.params.directorID;
        let info = await directorModel.getDetailDirectorByPersonID(personID);
        const person = await personModel.getPerson(info.personID);
        director.id = info.id;
        director.personID = person.id;
        director.gender = person.gender;
        director.fname = person.fname;
        director.lname = person.lname;
        if (person.birthday === null) {
            person.birthday = new Date('0000-00-00');
        } else {
            director.birthday = person.birthday.toISOString().slice(0, 10);
        }
        director.place = person.place;
        director.address = person.address;
        director.fullname = person.fname + ' ' + person.lname;
        return res.status(200).json({
            error: 1,
            success: true,
            data: director,
        });
    } catch (error) {
        return res.status(500).json({
            error: 0,
            success: false,
            message: error.message,

        });
    }
}

const addDirector = async (req, res) => {
    if (req.cookies.jwt) {
        if (req.method === 'POST' && req.body) {
            let decoded = JWTAction.verifyJWT(req.cookies.jwt);
            if (decoded) {
                if (decoded.user.permission.admin) {
                    const { data } = req.body
                    if (
                        data.fname != ""
                        && data.fname != undefined
                        && data.lname != ""
                        && data.lname != undefined
                        && data.gender != -1
                        && data.gender != undefined
                        && data.birthday != ""
                        && data.birthday != undefined
                        && data.place != ""
                        && data.place != undefined
                        && data.address != ""
                        && data.address != undefined
                    ) {
                        let created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
                        await personModel.addPerson(data.fname, data.lname, parseInt(data.gender), data.birthday, data.place, data.address, created_at);
                        const person = await personModel.getPersonByCreated(created_at);
                        await directorModel.addDirector(person.id);
                        return res.status(200).json({
                            error: 1,
                            message: "Update successfull!",
                        })
                    }
                    else if (data[0].personID) {
                        data.forEach(async (director) => {
                            if (await personModel.getPerson(director.personID)) {
                                if (await directorModel.getDetailDirectorByPersonID(director.personID) === undefined) {
                                    await directorModel.addDirector(director.personID);
                                }
                            }
                        });
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

export {
    getListDirector,
    getDetailDirector,
    addDirector
}