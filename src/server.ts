import app from './app';
import { config } from './config/config';
import { connectDB } from './config/database';

const startServer = async (): Promise<void> => {
    try {
        await connectDB();

        app.listen(config.port, () => {
            console.log(`🚀 Server running on port ${config.port} in ${config.env} mode`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
