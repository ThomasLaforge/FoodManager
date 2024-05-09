import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export interface IProductModel extends Model<InferAttributes<IProductModel>, InferCreationAttributes<IProductModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    name: string;
    description: string;
    image: string;
    bar_code: number;
}

export const ProductModel = (sequelize: Sequelize) => {
    return sequelize.define<IProductModel>('product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        bar_code: {
            type: DataTypes.INTEGER,
            unique: true
        }
    })
}