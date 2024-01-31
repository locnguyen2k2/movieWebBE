import { login, logout, checkLogin } from './Account';
import { addMovie, deleteMovie, detailMovie, getListMovie, updateMovie } from './Movie';
import { addUser, deleteUser, editUser, getDetailUser, getListUser } from './User';
import { getListDirector, getDetailDirector, addDirector } from './Director';
import { getListActor, getDetailActor, addActor } from './Actor';
import { getListCategory, getDetailCategory, updateCategory, addCategory } from './Category';
import { updatePerson, addPerson, getListPerson } from './Person';
import { getListMovieActor } from './MovieActor'

export default {
    login,
    logout,
    checkLogin,
    addMovie,
    updateMovie,
    detailMovie,
    deleteMovie,
    getListMovie,
    addUser,
    editUser,
    deleteUser,
    getListUser,
    getDetailUser,
    getListDirector,
    getListActor,
    getListCategory,
    getDetailActor,
    getDetailDirector,
    updatePerson,
    addPerson,
    addDirector,
    addActor,
    getListMovieActor,
    getListPerson,
    getDetailCategory,
    updateCategory,
    addCategory
}