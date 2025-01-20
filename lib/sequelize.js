const {Sequelize} = require("sequelize");
const config = require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.username,config.database,config.password,
    {
    port:config.port,
    host:config.host,
    dialect:config.dialect,
    logging:config.logging
});