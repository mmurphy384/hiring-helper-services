module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://149.28.42.190:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://dbAdmin:applejax@cluster0-hyr63.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || '!s3b&g7[pLm%ThHk'
  };