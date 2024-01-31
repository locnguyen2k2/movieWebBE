import actorModel from "../../models/actorModel";
import personModel from "../../models/personModel";
import movieActorModel from "../../models/movieActorModel";
import JWTAction from "../../middlewares/JWTAction";

const getListMovieActor = async (req, res) => {
    try {
        const listMovieActor = await movieActorModel.getAllMovieActor();
        // const listActor = await actorModel.getListActor();
        // const listPerson = await personModel.getListPerson();
        return res.status(200).json({
            error: 1,
            success: true,
            data: listMovieActor,
        });
    } catch (error) {
        return res.status(200).json({
            error: 0,
            success: false,
            message: error.message,
        });
    }
}

export {
    getListMovieActor,
}