import movieModel from "../models/movieModel"
import directorModel from "../models/directorModel";
import personModel from "../models/personModel";
import imageModel from "../models/imageModel";
import movieImageModel from "../models/movieImageModel";
import actorModel from "../models/actorModel";
import movieActorModel from "../models/movieActorModel";
const data = {};
data.session = {};

const addMovie = async (req, res) => {
    if (req.session.user) {
        data.session.user = req.session.user;
        if (req.session.user.permission.admin) {
            data.sub_content = 'movies/addMovie';
            data.content = 'add-movie-form';
            data.title = 'Thêm phim';
            data.directors = [];
            data.actors = [];
            let movieID = 0;
            const directors = await directorModel.getListDirector();
            const actors = await actorModel.getListActor();
            const persons = await personModel.getListPerson();
            for (const director of directors) {
                for (const person of persons) {
                    if (director.personID == person.id) {
                        let human = {};
                        human.id = person.id;
                        human.name = person.fname + ' ' + person.lname;
                        data.directors.push(human);
                    }
                }
            }
            for (const actor of actors) {
                for (const person of persons) {
                    if (actor.personID == person.id) {
                        let human = {};
                        human.id = person.id;
                        human.name = person.fname + ' ' + person.lname;
                        human.actorID = actor.id;
                        data.actors.push(human);
                    }
                }
            }
            if (req.method == 'POST') {
                const movie = req.body;
                if (
                    movie.movieTitle != ''
                    && movie.movieDirector != ''
                    && movie.movieActor != ''
                ) {
                    const movieDisc = movie.movieDisc != null ? movie.movieDisc : '';
                    let actors = [];
                    for (let i = 0; i < movie.movieActor.length; i++) {
                        if (movie.movieActor[i] != "" && await actorModel.getDetailActor(parseInt(movie.movieActor[i]))) {
                            if (actors.indexOf(movie.movieActor[i]) == -1) {
                                actors.push(movie.movieActor[i]);
                            }
                        }
                    }
                    if (actors.length >= 1) {
                        await movieModel.addMovie(movie.movieTitle, parseInt(movie.movieDirector), movieDisc);
                        movieID = await movieModel.getLastMovieID();
                        if (req.file != undefined) {
                            const file = req.file.filename.split('.')
                            let imageTitle = '';
                            for (let i = 0; i < file.length - 1; i++) {
                                if (i == 0) {
                                    imageTitle += file[i];
                                } else {
                                    imageTitle += '.' + file[i];
                                }
                            }
                            const type = req.file.mimetype.split('/')[1];
                            const path = req.file.path.split('\\')[3];
                            await imageModel.addImage(imageTitle, type, path);
                            const imageID = await imageModel.getLastImageID();
                            await movieImageModel.addMovieImage(parseInt(movieID), parseInt(imageID));
                        }
                        for (const actor of actors) {
                            let actorID = await actorModel.getDetailActor(parseInt(actor));
                            await movieActorModel.addMovieActor(parseInt(movieID), parseInt(actorID.id));
                        }
                    }
                    return res.redirect('/list-movie');
                } else {
                    return res.redirect('/');
                }
            }
            return res.render('layouts/main', { data: data });
        } else {
            return res.redirect('/');
        }
    } else {
        delete data.session.user;
        return res.redirect('/login');
    }
}

const getDetailMovie = async (req, res) => {
    data.sub_content = 'movies/detailMovie';
    data.content = 'detail-movie-form';
    data.title = 'Chi tiết phim';
    if (req.session.user) {
        data.session.user = req.session.user;
    } else {
        delete data.session.user;
    }
    const movie = await movieModel.getDetailMovie(req.params.movieID);
    data.movie = movie;
    return res.render('layouts/main', { data: data });
}

const getListMovie = async (req, res) => {
    data.sub_content = 'movies/listMovie';
    data.content = 'list-movie-form';
    data.title = 'Danh sách phim';
    if (req.session.user) {
        data.session.user = req.session.user;
    } else {
        delete data.session.user;
    }
    const movies = await movieModel.getListMovie();
    data.movies = movies;
    return res.render('layouts/main', { data: data });
}

export default {
    getDetailMovie,
    getListMovie,
    addMovie
}