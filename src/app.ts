import AdminJS, { ResourceWithOptions, ComponentLoader } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import * as AdminJSTypeorm from '@adminjs/typeorm'
import { DefaultAuthProvider } from 'adminjs';
import bcrypt from 'bcrypt'

import {
  accountDataSource,
  communicationDataSource,
  supportDataSource,
  systemDataSource,
  userdataDataSource 
} from './datasource/app-data-source.ts'
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

const initializeDataSources = async () => {
  await accountDataSource.initialize();
  await communicationDataSource.initialize();
  await supportDataSource.initialize();
  await systemDataSource.initialize();
  await userdataDataSource.initialize();
}

const findUserByEmail = async (email: string) => {
  try {
    const user = await accountDataSource.getRepository(User).findOneOrFail({ where: { email } });
    return user; 
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
}

const authenticate =  async({ email, password}: { email: string; password: string }) => {
  const user = await findUserByEmail(email);
  
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email
      };
    }
  } 
  return null;
}

const componentLoader = new ComponentLoader();
const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
});

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
      connectionString: 'postgres://admin:admin@0.tcp.sa.ngrok.io:15594/communication',
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  })


  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: 'sessionsecret',
      provider: authProvider,
    },
    null,
    {
      resave: true,
      secret: 'sessionsecret',
      saveUninitialized: true,
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()