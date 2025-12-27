import express from 'express';
import authRoutes from './routes/auth.js';
import progressRoutes from './routes/progress.js';
import wordRoutes from './routes/words.js';
import { PORT } from './config/conf.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/random-word', wordRoutes);

app.get('/', (req, res) => {
    res.sendFile('pages/home.html', { root: 'public' });
});

app.get('/account', (req, res) => {
    res.sendFile('pages/account.html', { root: 'public' });
});

app.get('/login', (req, res) => {
    res.sendFile('pages/login.html', { root: 'public' });
});

app.get(app.use((req, res) => {
    res.redirect('/');
}));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App running on http://localhost:${PORT}/`);
});