import { DataSource } from "typeorm"
import { TermsOfUse } from "../entities/termsOfUse.ts";
import { Policies } from "../entities/policies.ts";


export const dataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 13276,
    username: "admin",
    password: "admin",
    database: "communication",
    entities: [Policies, TermsOfUse],
    logging: true,
    synchronize: false,
});

/*
export const communicationDataSource = new DataSource({
    type: "postgres",
    host: "0.tcp.sa.ngrok.io",
    port: 13276,
    username: "admin",
    password: "admin",
    database: "communication",
    entities: ["src/entities/termsOfUse.ts"],
    logging: true
});

export const productDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "5771",
    database: "product",
    entities: ["src/entities-teste/brand.entity.ts", "src/entities-teste/product.entity.ts"],
    logging: true
});

export const userDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "5771",
    database: "user",
    entities: ["src/entities/account.entity.ts"],
    migrations: [],
    migrationsTableName: "migrations",
    logging: true
});*/
