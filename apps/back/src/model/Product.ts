import { DataTypes, Sequelize } from "sequelize";

export const ProductModel = (sequelize: Sequelize) => {
    return sequelize.define('product',{
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        bar_code: DataTypes.INTEGER
    })
}