import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";

import { OperationModel } from "./model/Operation";
import { RecipeModel } from "./model/Recipe";
import { TagModel } from "./model/Tag";
import { ProductModel } from "./model/Product";
import { ShoppingListModel } from "./model/ShoppingList";
import { UserModel} from "./model/User";
import { TokenBlackListModel } from "./model/TokenBlackList";

import { authRouter } from "./router/auth";
import { userRouter } from "./router/users";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Tag = TagModel(sequelize);
export const Recipe = RecipeModel(sequelize);
export const Operation = OperationModel(sequelize);
export const Product = ProductModel(sequelize);
export const ShoppingList = ShoppingListModel(sequelize);
export const User = UserModel(sequelize);
export const TokenBlackList = TokenBlackListModel(sequelize);

User.hasMany(ShoppingList);
ShoppingList.belongsTo(User);

// sequelize.sync({ force: true });
sequelize.sync();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
