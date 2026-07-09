export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT ?? 4000),
  cors: {
    origins: Array.from(
      new Set(
        [
          process.env.FRONTEND_URL || 'http://localhost:3000',
          ...(process.env.CORS_ORIGINS || '').split(','),
        ]
          .map((origin) => origin.trim())
          .filter(Boolean),
      ),
    ),
  },
  database: {
    postgres: {
      url: process.env.DATABASE_URL,
    },
  },
});
