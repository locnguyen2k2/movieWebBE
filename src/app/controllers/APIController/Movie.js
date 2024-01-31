import movieModel from './../../models/movieModel';
import directorModel from './../../models/directorModel';
import actorModel from './../../models/actorModel';
import imageModel from './../../models/imageModel';
import movieImageModel from './../../models/movieImageModel';
import movieActorModel from './../../models/movieActorModel';
import movieCategoryModel from '../../models/movieCategoryModel';
import CategoryModel from './../../models/categoryModel';
import personModel from './../../models/personModel';
import JWTAction from './../../middlewares/JWTAction';

const data = {};
const addMovie = async (req, res) => {
    if (req.cookies.jwt) {
        const decoded = JWTAction.verifyJWT(req.cookies.jwt);
        if (decoded) {
            if (req.method == 'POST') {
                if (decoded.user.permission.admin) {
                    let movieID = 0;
                    const directors = await directorModel.getListDirector();
                    const actors = await actorModel.getListActor();
                    const persons = await personModel.getListPerson();
                    const categories = await CategoryModel.getListCategory();
                    const movie = JSON.parse(req.body.data);
                    if (
                        movie.movieTitle != null
                        && movie.movieTitle != ''
                        && movie.movieDirector != null
                        && movie.movieDirector != ''
                        && movie.movieActor != null
                        && movie.movieActor.length > 0
                        && movie.movieCategory != null
                        && movie.movieCategory.length > 0
                    ) {
                        const movieDisc = movie.movieDisc != null ? movie.movieDisc : '';
                        let actors = [];
                        let categories = [];
                        for (let i = 0; i < movie.movieActor.length; i++) {
                            if (movie.movieActor[i] != '' && await actorModel.getDetailActor(parseInt(movie.movieActor[i]))) {
                                if (actors.indexOf(movie.movieActor[i]) == -1) {
                                    actors.push(movie.movieActor[i]);
                                }
                            }
                        }
                        for (let i = 0; i < movie.movieCategory.length; i++) {
                            if (movie.movieCategory[i] != '' && await CategoryModel.getDetailCategory(parseInt(movie.movieCategory[i]))) {
                                if (categories.indexOf(movie.movieCategory[i]) == -1) {
                                    categories.push(movie.movieCategory[i]);
                                }
                            }
                        }
                        if (actors.length >= 0 && categories.length >= 0) {
                            await movieModel.addMovie(movie.movieTitle, parseInt(movie.movieDirector), movieDisc);
                            movieID = await movieModel.getLastMovieID();
                            for (const actor of actors) {
                                await movieActorModel.addMovieActor(parseInt(movieID), parseInt(actor));
                            }
                            for (const category of categories) {
                                await movieCategoryModel.addMovieCategory(parseInt(movieID), parseInt(category));
                            }
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
                        }
                        return res.status(200).json({
                            error: 1,
                            message: "Add movie successfully"
                        })
                    } else {
                        return res.status(200).json({
                            error: 0,
                            message: "Fill all the fields"
                        })
                    }
                } else {
                    return res.status(200).json({
                        error: 0,
                        message: "Permission denied"
                    })
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "Bad request"
                })
            }
        } else {
            return res.status(200).json({
                error: 0,
                message: "Token invalid"
            })
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "Token not found"
        })
    }
}

const detailMovie = async (req, res) => {
    const movie = await movieModel.getDetailMovie(req.params.movieID);
    if (movie != null) {
        const directors = await directorModel.getListDirector();
        const persons = await personModel.getListPerson();
        const listMovieCategory = await movieCategoryModel.getListMovieCategoryByMovieID(req.params.movieID);
        const movieActors = await movieActorModel.getListMovieActor(req.params.movieID);
        let actors = [];
        let director = [];
        let categories = [];
        listMovieCategory.forEach(async (movieCategory) => {
            let category = await CategoryModel.getDetailCategory(movieCategory.category_id);
            category.movieCategoryID = movieCategory.id;
            categories.push(category);
        });
        movieActors.forEach(async (movieActor) => {
            let personID = (await actorModel.getDetailActor(movieActor.actorID)).personID;
            let person = persons.find(person => person.id == personID);
            person.actorID = movieActor.actorID;
            person.movieActorID = movieActor.id;
            actors.push(person);
        });
        director[0] = persons.find(person => person.id == movie.director);
        director[0].directorID = directors.find(director => director.personID == movie.director).id;
        delete movie.director;
        movie.director = director;
        const movieImages = await movieImageModel.getMovieImageMovieID(req.params.movieID);
        const images = [];
        for (const movieImage of movieImages) {
            if (await imageModel.getImage(movieImage.image_id) != null) {
                const image = await imageModel.getImage(movieImage.image_id);
                images.push(image);
            }
        }
        return res.status(200).json({
            error: 1,
            data: {
                movie,
                actors,
                images,
                categories
            },
            message: "Get detail movie successfully"
        })
    } else {
        return res.status(404).json({
            error: 0,
            message: "Movie not found"
        })
    }
}

const deleteMovie = async (req, res) => {
    if (req.cookies.jwt) {
        const decoded = JWTAction.verifyJWT(req.cookies.jwt);
        if (decoded.user.permission.admin) {
            if (await movieModel.getDetailMovie(req.body.id) != null) {
                await movieModel.deleteMovie(req.body.id);
                return res.status(200).json({
                    error: 1,
                    message: "Delete movie successfully"
                })
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "Movie not found"
                })
            }
        } else {
            return res.status(200).json({
                error: 0,
                message: "Permission denied"
            })
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "Unauthorized"
        })
    }
}

const getListMovie = async (req, res) => {
    const imageMovie = await movieImageModel.getListMovieImage();
    const categories = await CategoryModel.getListCategory();
    if (req.params.category) {
        let movies = [];
        switch (req.params.category) {
            case 'all':
                movies = await movieModel.getListMovie();
                for (let i = 0; i < movies.length; i++) {
                    for (let j = 0; j < imageMovie.length; j++) {
                        if (movies[i].id == imageMovie[j].movie_id) {
                            movies[i].image = await imageModel.getImageByID(imageMovie[j].image_id);
                            break;
                        }
                    }
                }
                for (let i = 0; i < movies.length; i++) {
                    let listMovieCategory = await movieCategoryModel.getListMovieCategoryByMovieID(movies[i].id);
                    let categories = [];
                    listMovieCategory.forEach(async (movieCategory) => {
                        let category = await CategoryModel.getDetailCategory(movieCategory.category_id);
                        categories.push(category);
                    });
                    movies[i].categories = categories;
                }
                return res.status(200).json({
                    error: 1,
                    data: movies,
                    message: "Get all movies successfully"
                })
            case 'new':
                movies = await movieModel.getNewMovies();
                for (let i = 0; i < movies.length; i++) {
                    for (let j = 0; j < imageMovie.length; j++) {
                        if (movies[i].id == imageMovie[j].movie_id) {
                            movies[i].image = await imageModel.getImageByID(imageMovie[j].image_id);
                            break;
                        }
                    }

                }
                for (let i = 0; i < movies.length; i++) {
                    let listMovieCategory = await movieCategoryModel.getListMovieCategoryByMovieID(movies[i].id);
                    let categories = [];
                    listMovieCategory.forEach(async (movieCategory) => {
                        let category = await CategoryModel.getDetailCategory(movieCategory.category_id);
                        categories.push(category);
                    });
                    movies[i].categories = categories;
                }
                return res.status(200).json({
                    error: 1,
                    data: movies,
                    message: "Get all movies successfully"
                })
            case 'trendding':
                movies = await movieModel.getTrenddingMovies();
                for (let i = 0; i < movies.length; i++) {
                    for (let j = 0; j < imageMovie.length; j++) {
                        if (movies[i].id == imageMovie[j].movie_id) {
                            movies[i].image = await imageModel.getImageByID(imageMovie[j].image_id);
                            break;
                        }
                    }

                }
                for (let i = 0; i < movies.length; i++) {
                    let listMovieCategory = await movieCategoryModel.getListMovieCategoryByMovieID(movies[i].id);
                    let categories = [];
                    listMovieCategory.forEach(async (movieCategory) => {
                        let category = await CategoryModel.getDetailCategory(movieCategory.category_id);
                        categories.push(category);
                    });
                    movies[i].categories = categories;
                }
                return res.status(200).json({
                    error: 1,
                    data: movies,
                    message: "Get all movies successfully"
                })
            default:
                movies = await movieModel.getListMovie();
                for (let i = 0; i < movies.length; i++) {
                    for (let j = 0; j < imageMovie.length; j++) {
                        if (movies[i].id == imageMovie[j].movie_id) {
                            movies[i].image = await imageModel.getImageByID(imageMovie[j].image_id);
                            break;
                        }
                    }

                }
                return res.status(200).json({
                    error: 1,
                    data: movies,
                    message: "Get all movies successfully"
                })
        }
    } else {
        return res.status(400).json({
            error: 0,
            message: "Bad request"
        })
    }
}

const updateMovie = async (req, res) => {
    if (req.cookies.jwt) {
        const decoded = JWTAction.verifyJWT(req.cookies.jwt);
        if (decoded) {
            if (decoded.user.permission.admin) {
                if (req.method == 'POST') {
                    let id = req.params.id;
                    let { data } = req.body
                    if (id != null && id != '' && data != null && data != '') {
                        if (await movieModel.getDetailMovie(id)) {
                            let movieActor = await movieActorModel.getListMovieActor(id);
                            let movieCategory = await movieCategoryModel.getListMovieCategoryByMovieID(id);
                            if (data.name != null
                                && data.description != null
                            ) {
                                if (data.name.name != ""
                                    && data.description.description != ""
                                ) {
                                    let actorKeys = Object.keys(data.actors);
                                    let directorKeys = Object.keys(data.director);
                                    let categoryKeys = Object.keys(data.categories);
                                    movieCategory.forEach(async (movieCategory) => {
                                        if (categoryKeys.indexOf(movieCategory.id.toString()) == -1) {
                                            await movieCategoryModel.deleteMovieCategoryByID(movieCategory.id);
                                        }
                                    })
                                    movieActor.forEach(async (movieActor) => {
                                        if (actorKeys.indexOf(movieActor.id.toString()) == -1) {
                                            await movieActorModel.deleteMovieActorByID(movieActor.id);
                                        }
                                    })
                                    actorKeys.forEach(async (actorKey) => {
                                        if (data.actors[(actorKey)] != null
                                            && data.actors[(actorKey)] != '') {
                                            if (actorKey.indexOf('new-') != -1) {
                                                await movieActorModel.addMovieActor(id, data.actors[(actorKey)]);
                                            } else if (await movieActorModel.getMovieActorByMovieIDActorID(id, data.actors[(actorKey)]) == null) {
                                                await movieActorModel.updateMovieActorByID(parseInt(actorKey), id, data.actors[(actorKey)]);
                                            }
                                        }
                                    });
                                    directorKeys.forEach(async (directorKey) => {
                                        if (data.director[(directorKey)] != null
                                            && data.director[(directorKey)] != '') {
                                            if (await movieModel.getDetailMovie(id).director != data.director[(directorKey)]) {
                                                await movieModel.updateMovieDirector(id, data.director[(directorKey)]);
                                            }
                                        }
                                    });
                                    categoryKeys.forEach(async (categoryKey) => {
                                        if (data.categories[(categoryKey)] != null
                                            && data.categories[(categoryKey)] != '') {
                                            if (categoryKey.indexOf('new-') != -1) {
                                                await movieCategoryModel.addMovieCategory(id, data.categories[(categoryKey)]);
                                            } else if (await movieCategoryModel.getMovieCategoryByMovieIDCategoryID(id, data.categories[(categoryKey)]) == null) {
                                                await movieCategoryModel.updateMovieCategoryByID(parseInt(categoryKey), id, data.categories[(categoryKey)]);
                                            }
                                        }
                                    })
                                    await movieModel.updateMovie(id, data.name.name, data.description.description, data.trendding.trendding);
                                    return res.status(200).json({
                                        error: 1,
                                        message: 'Update movie successfully',
                                        // data: 
                                    })
                                } else {
                                    return res.status(200).json({
                                        error: 0,
                                        message: "Fill all the fields"
                                    })
                                }
                            } else {
                                return res.status(200).json({
                                    error: 0,
                                    message: "Fill all the fields"
                                })
                            }
                        } else {
                            return res.status(200).json({
                                error: 0,
                                message: "Please enter full information"
                            })
                        }
                    } else {
                        return res.status(200).json({
                            error: 0,
                            message: "Movie not found"
                        })
                    }
                } else {
                    return res.status(200).json({
                        error: 0,
                        message: "Bad request"
                    })
                }
            } else {
                return res.status(200).json({
                    error: 0,
                    message: "Permission denied"
                })
            }
        } else {
            return res.status(200).json({
                error: 0,
                message: "Token invalid"
            })
        }
    } else {
        return res.status(200).json({
            error: 0,
            message: "Token not found"
        })

    }
}

export {
    getListMovie,
    addMovie,
    detailMovie,
    updateMovie,
    deleteMovie
}