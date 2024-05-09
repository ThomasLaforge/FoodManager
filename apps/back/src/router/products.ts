import { Router } from "express";
import { Product } from "..";

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

productRouter.get("/:id", async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).send("Product not found");
    }
});

productRouter.post("/", async (req, res) => {
    const { name, description, bar_code, image } = req.body.data;
    if(!name || !description || !bar_code || !image){
        res.status(400).send("Missing required information");
    }
    else {
        const newProduct = await Product.create({ name, description, image, bar_code});
        res.json(newProduct);
    }
});

productRouter.put("/:id", async (req, res) => {
    const { name, description, bar_code, image } = req.body.data;
    const actual = await Product.findOne({ where: { id: req.params.id } });
    if (actual) {
        const newProduct = await actual.update({ name, description, image, bar_code });
        res.json(actual);
    }
    else {
        res.status(404).send("Product not found");
    }
});

productRouter.delete("/:id", async (req, res) => {
    const actual = await Product.findOne({ where: { id: req.params.id } });
    if (actual) {
        await actual.destroy();
        res.send("deleted");
    }
    else {
        res.status(404).send("Product not found");
    }
});

productRouter.post("/check-exists", async (req, res) => {
    const { name, bar_code, description, image } = req.body.data;
    const product = await Product.findOne({ where: { bar_code } });
    if (product) {
        res.json({ status: "already-exists", ...product.dataValues });
    }
    else {
        const newProduct = await Product.create({ 
            name, 
            bar_code,
            description,
            image
        });
        res.json({ status: "new", ...newProduct });
    }
});