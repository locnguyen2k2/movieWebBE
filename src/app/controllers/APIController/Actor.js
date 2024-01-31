import actorModel from "../../models/actorModel";
import personModel from "../../models/personModel";
import JWTAction from "../../middlewares/JWTAction";
const getListActor = async (req, res) => {
    try {
        const listActor = await actorModel.getListActor();
        const listPerson = await personModel.getListPerson();
        let actors = [];
        listActor.forEach((actor) => {
            const person = listPerson.find((person) => person.id === actor.personID);
            actor.id = actor.id;
            actor.fullName = person.fname + ' ' + person.lname;
            actors.push(actor);
        });
        return res.status(200).json({
            error: 1,
            success: true,
            data: actors,
        });
    } catch (error) {
        return res.status(200).json({
            error: 0,
            success: false,
            message: error.message,

        });
    }
}

const getDetailActor = async (req, res) => {
    let actor = {};
    try {
        const actorID = req.params.actorID;
        let info = await actorModel.getDetailActor(actorID);
        const person = await personModel.getPerson(info.personID);
        actor.id = info.id;
        actor.personID = person.id;
        actor.gender = person.gender;
        actor.fname = person.fname;
        actor.lname = person.lname;
        if (person.birthday === null) {
            person.birthday = new Date('0000-00-00');
        } else {
            actor.birthday = person.birthday.toISOString().slice(0, 10);
        }
        actor.place = person.place;
        actor.address = person.address;
        actor.fullname = person.fname + ' ' + person.lname;
        return res.status(200).json({
            error: 1,
            success: true,
            data: actor,
        });
    } catch (error) {
        return res.status(500).json({
            error: 0,
            success: false,
            message: error.message,

        });
    }
}

const addActor = async (req, res) => {
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
                        await actorModel.addActor(person.id);
                        return res.status(200).json({
                            error: 1,
                            message: "Update successfull!",
                        })
                    } else if (data[0].personID) {
                        data.forEach(async (actor) => {
                            if (await personModel.getPerson(actor.personID)) {
                                if (await actorModel.getActorByPersonID(actor.personID) === undefined) {
                                    await actorModel.addActor(actor.personID);
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
    getListActor,
    getDetailActor,
    addActor
}