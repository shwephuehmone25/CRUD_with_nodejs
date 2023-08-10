import express from "express";
import Stock from "../models/Stock.js";

const router = express.Router();

//http://localhost:9000/api/stocks [GET] [getAllStocks]
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const search = req.query.search;
    const perpage = parseInt(req.query.perpage);

    const filter = {};
    if (search) {
      filter["$text"] = { $search: search };
    }
    const offset = (page - 1) * perpage;

    //pagination limit
    const stocks = await Stock.find(filter).limit(perpage).skip(offset);
    const total = await Stock.countDocuments(filter);

    res.json({
      code: 200,
      message: "Success",
      data: stocks,
      total,
    });
  } catch (err) {
    next(err);
  }
});

//http://localhost:9000/api/stocks [POST] [createStock]
router.post("/", async (req, res, next) => {
  try {
    const { code, name, price } = req.body;
    const stock = new Stock({ code, name, price });
    await stock.save();
    res.status(201).json({
      code: 201,
      message: "Stock created successfully",
      data: stock,
    });
  } catch (err) {
    next(err);
  }
});

const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);
    if(!stock)
    {
    res.status(404).json({
      code: 404,
      message: "Stock not found",
    });
  }
  req.stock = stock;
  next();
  } catch (err) {
    next(err);
  }
}

//http://localhost:9000/api/stocks [GET] [showStockDetails]
router.get("/:id", getByID, async (req, res, next) => { 
  try {
    const stock = req.stock;
    stock.code = req.code;
    stock.name = req.name;
    stock.price = req.price;
    await stock.save();
    res.status(200).json({
      code: 200,
      message: "Stock updated successfully",
      data: stock,
    });
  } catch (err) {
    next(err);
  }
});

//http://localhost:9000/api/stocks [PUT] [updateStock]
router.put("/:id", getByID, async (req, res, next) => { 
  res.status(200).json({
    code: 200,
    message: "success",
    data: req.stock
  });
});

//http://localhost:9000/api/stocks [DELETE] [deleteStock]
router.delete("/:id", getByID, async (req, res, next) => { 
  try {
    await req.stock.remove();
    res.status(200).json({
      code: 200,
      message: "Stock deleted successfully",
    });
  } catch (err) {
    // console.log(err);
    // res.status(500).json({
    //   code: 500,
    //   message: err.message,
    // });
    next(err);
  }
});

export default router;
