import { DataSource } from "typeorm"
import { Banners } from "../entities/db/communication/banners.ts";
import { TermsOfUse } from "../entities/db/communication/termsOfUse.ts";
import { Policies } from "../entities/db/communication/policies.ts";
import { FederatedStates } from "../entities/db/support/federatedStates.ts";
import { Organizers } from "../entities/db/support/organizers.ts";
import { User } from "../entities/db/account/user.ts";
import { Services } from "../entities/db/system/services.ts";
import { ApiTokens } from "../entities/db/system/apiTokens.ts";
import { ApiTokenPrivileges } from "../entities/db/system/apiTokenPrivileges.ts";
import { Log } from "../entities/utils/log.ts";

export const accountDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 14679,
    username: "admin",
    password: "admin",
    database: "account",
    entities: [User],
    logging: true,
    synchronize: false,
    migrations: ['src/migration/**/*.ts'],
});

export const communicationDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 14679,
    username: "admin",
    password: "admin",
    database: "communication",
    entities: [Banners, Policies, TermsOfUse],
    logging: true,
    synchronize: false,
});


export const supportDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 14679,
    username: "admin",
    password: "admin",
    database: "support",
    entities: [FederatedStates, Organizers],
    logging: true,
    synchronize: false,
});

export const systemDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 14679,
    username: "admin",
    password: "admin",
    database: "system",
    entities: [ApiTokens, Services/*, ApiTokenPrivileges*/],
    logging: true,
    synchronize: false,
});

export const userdataDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 14679,
    username: "admin",
    password: "admin",
    database: "userdata",
    entities: [/*UserPriorityOrganizers*/],
    logging: true,
    synchronize: false,
});

export const logDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 14679,
    username: "admin",
    password: "admin",
    database: "log",
    entities: [Log],
    migrations: ['src/migrations/**/*.ts'],
    logging: true,
    synchronize: false,
});
