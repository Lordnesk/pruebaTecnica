import { Sequelize } from "sequelize-typescript";
import { User, Cart, Entities, Order, ProductCart, Product, Rol } from "../models/index";

const sequelize: Sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "123456789",
    database: "ecomFast",
    models: [User, Cart, Entities, Order, ProductCart, Product, Rol]
});

export default sequelize;

