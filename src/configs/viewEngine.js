const configViewEngine = (app) => {
  app.set('view engine', 'ejs');
  app.set('views', './src/resources/views');
}

export default configViewEngine;
