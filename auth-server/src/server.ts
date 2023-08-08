import express from 'express'
import 'reflect-metadata';
import middleware from './middlewares';
import EnvironmentConfiguration from './config/env.config';
import {Provider} from './test'

async function bootStrap() {
  const app = express();

  await middleware(app);
  app.listen(EnvironmentConfiguration.PORT, async () => {
   
      console.info(
        `Server started at http://localhost:${EnvironmentConfiguration.PORT}`
      );
  });
}
try {
  bootStrap();
} catch (error) {
  console.log(error);
  process.exit(1);
}

