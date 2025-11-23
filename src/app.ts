import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import ratingRoutes from './routes/ratingRoutes';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000', // Next.js frontend
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
