import { DataTypes, Sequelize } from "sequelize";

export const ShoppingListModel = (sequelize: Sequelize) => {
    return sequelize.define('shopping_list',{
        name: DataTypes.STRING,
        archived: DataTypes.BOOLEAN,
    })
}