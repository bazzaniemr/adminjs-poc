import AdminJS, { ComponentLoader } from 'adminjs'
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
import { User } from './entities/db/account/user.ts'
import { Banners } from './entities/db/communication/banners.ts'
import { Policies } from './entities/db/communication/policies.ts'
import { TermsOfUse } from './entities/db/communication/termsOfUse.ts'
import { FederatedStates } from './entities/db/support/federatedStates.ts'
import { Organizers } from './entities/db/support/organizers.ts'
import { Services } from './entities/db/system/services.ts'
import { ApiTokens } from './entities/db/system/apiTokens.ts'
import loggerFeature from '@adminjs/logger'
import { Log } from './entities/utils/log.ts'

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
        id: String(user.id),
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
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },
    {
      resource: Banners,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },
    {
      resource: Policies,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },
    {
      resource: TermsOfUse,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },
    {
      resource: FederatedStates,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },
    {
      resource: Organizers,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },    
    {
      resource: Services,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },    
    {
      resource: ApiTokens,
      options: {},
      features: [
        loggerFeature({
          componentLoader,
          propertiesMapping: {
            user: 'userId',
          },
         userIdAttribute: 'id',
        }),
      ],
    },    
    // {
    //   resource: ApiTokenPrivileges,
    //   options: {},
    // },    
    // {
    //   resource: UserPriorityOrganizers,
    //   options: {},
    // }, 
    {
      resource: Log,
      options: {},
    },   
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
      connectionString: process.env.DATABASE_COMPLETE_URL,
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