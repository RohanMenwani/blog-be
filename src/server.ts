import app from './app';

const startServer = async (): Promise<void> => {
    try {

        app.listen(8000, () => {
            console.log(`🚀 Server running on port ${8000} `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
