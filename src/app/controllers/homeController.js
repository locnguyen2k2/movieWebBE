import movieModel from '../models/movieModel';
import personModel from '../models/personModel';
import movieImageModel from '../models/movieImageModel';
import imageModel from '../models/imageModel';

const data = {};
data.session = {};
const index = async (req, res) => {
  data.sub_content = 'home';
  data.content = 'home';
  data.items = [];
  if (req.session.user) {
    data.session.user = req.session.user;
  } else {
    delete data.session.user;
  }
  let listMovie = await movieModel.getListMovie();
  for (const movie of listMovie) {
    let movieImage = await movieImageModel.getMovieImageMovieID(movie.id);
    if (movieImage) {
      let poster = await imageModel.getImage(movieImage[0].image_id);
      if (poster) {
        movie.poster = poster;
      }
    }
  }
  data.listMovie = listMovie;
  return res.render('layouts/main', { data: data });
}

export default {
  index,
}
