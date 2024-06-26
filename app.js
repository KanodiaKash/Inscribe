const express=require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes'); 
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser } = require('./middleware/authMiddleware');
const user = require('./models/user.js');

const dbURI = 'mongodb+srv://kanodiakash:Hellokitty@kashmongo.zrl04hu.mongodb.net/13Jun?retryWrites=true&w=majority&appName=KashMongo'
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

app.set('view engine' ,'ejs');
app.use(express.static('public'));
app.use(express.json()); // AUTH
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
  app.get('*', checkUser);

  app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
  app.use(router);
  app.use(authRoutes);

  // 404 page
  app.use((req, res) => {
    res.status(404).render('404');
  });
