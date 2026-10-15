/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Product, sequelize } from "../models/Product.js";

await sequelize.sync();

const product = {

  index: async (req, res) => {
    res.send("Index Page");
  },

  // POST /product
  insert: async (req, res) => {
    try {

      const { name, description, category, price, stock } = req.body;

      const newProduct = await Product.create({
        name,
        description,
        category,
        price,
        stock
      });

      res.status(201).json(newProduct);

    } catch (error) {

      res.status(500).json({
        message: "Error creating product",
        error: error.message
      });

    }
  },

  // GET /products
  all: async (req, res) => {
    try {

      const products = await Product.findAll();

      res.status(200).json(products);

    } catch (error) {

      res.status(500).json({
        message: "Error getting products",
        error: error.message
      });

    }
  },

  // GET /product/:id
  isa: async (req, res) => {
    try {

      const productData = await Product.findByPk(req.params.id);

      if (!productData) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.status(200).json(productData);

    } catch (error) {

      res.status(500).json({
        message: "Error getting product",
        error: error.message
      });

    }
  }

};

export { product };