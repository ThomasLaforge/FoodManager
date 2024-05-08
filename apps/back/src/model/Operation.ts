import { DataTypes, Sequelize } from "sequelize";

export const OperationModel = (sequelize: Sequelize) => {
    return sequelize.define('operation',{
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    })
}