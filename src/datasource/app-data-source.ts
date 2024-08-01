import { DataSource } from "typeorm"
import { Banners } from "../entities/communication-db/banners.ts";
import { TermsOfUse } from "../entities/communication-db/termsOfUse.ts";
import { Policies } from "../entities/communication-db/policies.ts";
import { FederatedStates } from "../entities/support-db/federatedStates.ts";
import { Organizers } from "../entities/support-db/organizers.ts";
import { User } from "../entities/account-db/user.ts";

export const accountDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 19636,
    username: "admin",
    password: "admin",
    database: "account",
    entities: [User],
    logging: true,
    synchronize: false,
});

export const communicationDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 19636,
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
    port: 19636,
    username: "admin",
    password: "admin",
    database: "support",
    entities: [FederatedStates, Organizers],
    logging: true,
    synchronize: false,
});
