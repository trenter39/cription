import expressHandlebars from 'express-handlebars';
import express from 'express';
import authRoutes from './routes/auth.js';
import progressRoutes from './routes/progress.js';
import wordRoutes from './routes/words.js';
import { PORT } from './config/conf.js';

const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

const app = express();
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        res.render('home', {
            title: 'Cription | Guess Words',
            script: '<script type="module" src="/scripts/main.js"></script>'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading page!");
    }
});

app.get('/settings', async (req, res) => {
    res.redirect('/');
});

app.get('/login', async (req, res) => {
    try {
        res.render('login', {
            title: 'Login | Cription',
            script: '<script type="module" src="/scripts/auth.js"></script>'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading page!");
    }
});

app.get('/account', async (req, res) => {
    try {
        res.render('account', {
            title: 'Account | Cription',
            script: '<script type="module" src="/scripts/account.js"></script>',
            upper_script: `<script>const token = localStorage.getItem('token');if (!token) { window.location.href = '/login'; }</script>`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading page!");
    }
});

app.use('/api', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/random-word', wordRoutes);

app.use((req, res) => {
    res.redirect('/');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App running on http://localhost:${PORT}/`);
})