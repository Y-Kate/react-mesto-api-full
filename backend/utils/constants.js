const corsOptions = {
  origin: [
    'https://mestokate.nomoredomains.work',
    'http://mestokate.nomoredomains.work',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  corsOptions,
};
