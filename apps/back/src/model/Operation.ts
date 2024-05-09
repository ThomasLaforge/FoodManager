import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export enum OperationType {
    ADD = 'add',
    REMOVE = 'remove'
}

export interface IOperationModel extends Model<InferAttributes<IOperationModel>, InferCreationAttributes<IOperationModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  quantity: number;
  type: OperationType;
  product_id: number;
}

export const OperationModel = (sequelize: Sequelize) => {
    return sequelize.define<IOperationModel>('operation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER,
        type: DataTypes.ENUM(OperationType.ADD, OperationType.REMOVE),
        product_id: DataTypes.INTEGER
    })
}