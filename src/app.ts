import AdminJS, { ResourceWithOptions } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import * as AdminJSTypeorm from '@adminjs/typeorm'

import { TermsOfUse } from './entities/termsOfUse.ts'
import { dataSource } from './datasource/app-data-source.ts'
import { Policies } from './entities/policies.ts'

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
})

const PORT = 3000;

const DEFAULT_ADMIN = {
  id: '1',
  email: 'admin@email.com',
  password: 'admin123',
  role: "admin"
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
}

const policiesResource: ResourceWithOptions = {
  resource: Policies,
  options: {},
};

const termsOfUseResource: ResourceWithOptions = {
  resource: TermsOfUse,
  options: {},
};

const start = async () => {
  const app = express();

  await dataSource.initialize();
  const adminOptions = {
    resources: [
      policiesResource,
      termsOfUseResource
    ],
  }

  const admin = new AdminJS(adminOptions);

  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: 'postgres://admin:admin@0.tcp.sa.ngrok.io:13276/communication',
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  })


  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()