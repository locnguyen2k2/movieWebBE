import express from 'express';
import multer, { diskStorage } from 'multer';
import homeController from '../app/controllers/homeController.js';
import aboutController from '../app/controllers/aboutController.js';
import userController from '../app/controllers/userController.js';
import errorController from '../app/controllers/errorController.js';
import permissionController from '../app/controllers/permissionController.js';
import movieController from '../app/controllers/movieController.js';

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

const router = express.Router();
const initWebRoute = (app) => {
  router.get('/', homeController.index);
  router.get('/about', aboutController.index);
  router.get('/create-new-user', userController.addUser);
  router.post('/create-new-user', userController.addUser);
  router.get('/update-user/:username', userController.updateUser);
  router.post('/update-user', userController.updateUser);
  router.get('/delete-user/:username', userController.updateUserStatus);
  router.get('/list-user', userController.listUser);
  router.get('/detail-user', userController.detailUser);
  router.get('/login', userController.login);
  router.post('/login', userController.login);
  router.get('/logout', userController.logout);
  router.get('/update-permission/:permissionID', permissionController.updatePermission);
  router.post('/update-permission', permissionController.updatePermission);
  router.get('/detail-movie/:movieID', movieController.getDetailMovie);
  router.get('/list-movie', movieController.getListMovie);
  router.get('/add-movie', movieController.addMovie);
  router.post('/add-movie', upload.single('poster'), movieController.addMovie);
  // load 404 page if not found the router
  router.get('*', errorController.error404);
  app.use('/', router);
}

export default initWebRoute;
