import { Router } from "express";
import { Operation } from "..";
import { IOperationModel, OperationType } from "../model/Operation";

export const stockRouter = Router();

stockRouter.get("/", async (req, res) => {
    const ops = await Operation.findAll({
        include: { all: true }
    });
    const stock = ops.reduce((acc: any, op: IOperationModel) => {
        const { product_id, quantity, type } = op;
        if (!acc[product_id]) {
            acc[product_id] = { amount: 0 };
        }
        if (type === OperationType.ADD) {
            acc[product_id].amount += quantity;
        }
        else {
            acc[product_id].amount -= quantity;
        }
        return acc;
    }
    , {});
    const filteredStock = Object.keys(stock)
        .map((key) => ({ 
            product_id: parseInt(key), 
            amount: stock[key].amount 
        }))
        .filter((stock) => stock.amount > 0);

    res.json(filteredStock);
});

stockRouter.post("/add", async (req, res) => {
    const { product_id, quantity } = req.body.data;
    if(!product_id || !quantity){
        res.status(400).send("Missing required information");
    }
    else {
        const newOperation = await Operation.create({ product_id, quantity, type: OperationType.ADD });
        res.json(newOperation);
    }
});

stockRouter.post("/remove", async (req, res) => {
    const { product_id, quantity } = req.body.data;
    if(!product_id || !quantity){
        res.status(400).send("Missing required information");
    }
    else {
        const newOperation = await Operation.create({ product_id, quantity, type: OperationType.REMOVE });
        res.json(newOperation);
    }
});