import AdminJS, { ResourceWithOptions } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import * as AdminJSTypeorm from '@adminjs/typeorm'

import { accountDataSource, communicationDataSource, supportDataSource, systemDataSource, userdataDataSource } from './datasource/app-data-source.ts'
import { User } from './entities/account-db/user.ts'
import { Banners } from './entities/communication-db/banners.ts'
import { Policies } from './entities/communication-db/policies.ts'
import { TermsOfUse } from './entities/communication-db/termsOfUse.ts'
import { FederatedStates } from './entities/support-db/federatedStates.ts'
import { Organizers } from './entities/support-db/organizers.ts'
import { Services } from './entities/system-db/services.ts'
import { ApiTokens } from './entities/system-db/apiTokens.ts'
import { ApiTokenPrivileges } from './entities/system-db/apiTokenPrivileges.ts'

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

const initializeDataSources = async () => {
  await accountDataSource.initialize();
  await communicationDataSource.initialize();
  await supportDataSource.initialize();
  await systemDataSource.initialize();
  await userdataDataSource.initialize();
}

// TODO criar um ResourceFactory com a classe ResourceWithOptions
const buildResources = {
  resources: [
    {
      resource: User,
      options: {},
    },
    {
      resource: Banners,
      options: {},
    },
    {
      resource: Policies,
      options: {},
    },
    {
      resource: TermsOfUse,
      options: {},
    },
    {
      resource: FederatedStates,
      options: {},
    },
    {
      resource: Organizers,
      options: {},
    },    
    {
      resource: Services,
      options: {},
    },    
    {
      resource: ApiTokens,
      options: {},
    },    
    // {
    //   resource: ApiTokenPrivileges,
    //   options: {},
    // },    
    // {
    //   resource: UserPriorityOrganizers,
    //   options: {},
    // },    
  ]
}

const start = async () => {
  const app = express();

  await initializeDataSources();
  
  const adminOptions = buildResources;
  const admin = new AdminJS(adminOptions);

  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: 'postgres://admin:admin@0.tcp.sa.ngrok.io:19636/communication',
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