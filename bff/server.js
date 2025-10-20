const app = require('./src/app');
const config = require('./src/config');

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 BFF Service running on port ${PORT}`);
  console.log(`📝 Environment: ${config.env}`);
  console.log(`🔗 Auth Service: ${config.services.auth.baseUrl}`);
  console.log(`🔗 Business Service: ${config.services.business.baseUrl}`);
});