import multer, { diskStorage } from 'multer';
import express from 'express';
import auth from './../app/middlewares/auth';
import api from './../app/controllers/APIController/index';
const router = express.Router();
// Cấu hình nơi lưu file ảnh
const upload = multer({
   dest: 'src/public/images/uploads/',
   storage: diskStorage({
      destination: (req, file, callback) => {
         callback(null, 'src/public/images/uploads/');
      },
      filename: (req, file, callback) => {
         callback(null, `${Date.now()}-${file.originalname}.${file.mimetype.split('/')[1]}`);
      }
   })
});
const initAPIRoutes = (app) => {
   // User APIs
   router.put('/update-user', auth.authAdmin, api.editUser);
   router.post('/create-new-user', api.addUser);
   router.get('/get-list-user', auth.authUser, api.getListUser);
   router.get('/delete-user/:username', auth.authAdmin, api.deleteUser);
   router.get('/detail-user/:username', auth.authUser, api.getDetailUser);
   // Account APIs
   router.post('/login', api.login);
   router.get('/logout', api.logout);
   router.post('/update-user', auth.authUser, api.editUser)
   router.get('/check-login', api.checkLogin);
   // Movie APIs
   router.post('/add-movie', auth.authAdmin, upload.single('movieImage'), api.addMovie);
   router.get('/get-list-movie/:category', api.getListMovie);
   router.get('/detail-movie/:movieID', api.detailMovie);
   router.post('/delete-movie', auth.authAdmin, api.deleteMovie);
   router.post('/update-movie/:id', auth.authAdmin, api.updateMovie);
   // Director APIs
   router.get('/get-list-director', api.getListDirector);
   router.get('/detail-director/:directorID', api.getDetailDirector);
   router.post('/add-director', auth.authAdmin, api.addDirector);
   // Acotr APIs
   router.get('/get-list-actor', api.getListActor);
   router.get('/detail-actor/:actorID', api.getDetailActor);
   router.post('/add-actor', auth.authAdmin, api.addActor);
   // Category APIs
   router.get('/get-list-category', api.getListCategory);
   router.post('/get-detail-category', api.getDetailCategory);
   router.post('/update-category/', auth.authAdmin, api.updateCategory);
   router.post('/add-category', auth.authAdmin, api.addCategory);
   // Person APIs
   router.post('/update-person/:id', auth.authAdmin, api.updatePerson);
   router.post('/add-person', auth.authAdmin, api.addPerson);
   router.get('/get-list-person', api.getListPerson);
   // Movie-actor APIs
   router.get('/get-list-movie-actor', api.getListMovieActor);
   return app.use('/api/v1', router);
}

export default initAPIRoutes;
