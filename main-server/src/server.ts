import express from 'express'
import middleware from './middlewares';
import EnvironmentConfiguration from './config/env.config';
async function bootStrap() {
  const app = express();

  await middleware(app);
  app.listen(EnvironmentConfiguration.PORT, async () => {
   
      console.info(
        `Main-Server started at http://localhost:${EnvironmentConfiguration.PORT}`
      );
  });
}
try {
  bootStrap();
} catch (error) {
  console.log(error);
  process.exit(1);
}

