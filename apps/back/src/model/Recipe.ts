import { DataTypes, Sequelize } from "sequelize";

export const RecipeModel = (sequelize: Sequelize) => {
    return sequelize.define('recipe',{
        name: DataTypes.STRING,
    })
}