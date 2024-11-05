  const express = require("express");
  const mongoose = require("mongoose");
  const ProductSchema = require("../models/productModel");
  const router = express.Router();

  // Utility functions for filtering, searching, and paginating
  const searchProducts = (query, params) => {
    if (params.keyword) {
      query.name = { $regex: params.keyword, $options: "i" };
    }
    return query;
  };

  const filterProducts = (query, params) => {
    const filterParams = { ...params };
    ["keyword", "limit", "page"].forEach((field) => delete filterParams[field]);

    // Filter by price
    if (filterParams.price) {
      const priceFilter = JSON.parse(filterParams.price);
      if (priceFilter.lt) {
        query.price = { $lt: parseFloat(priceFilter.lt) };
      }
      if (priceFilter.lte) {
        query.price = { ...query.price, $lte: parseFloat(priceFilter.lte) };
      }
      if (priceFilter.gt) {
        query.price = { ...query.price, $gt: parseFloat(priceFilter.gt) };
      }
      if (priceFilter.gte) {
        query.price = { ...query.price, $gte: parseFloat(priceFilter.gte) };
      }
      delete filterParams.price;
    }

    // Filter by category
    if (filterParams.category) {
      query.category = { $regex: filterParams.category, $options: "i" };
      delete filterParams.category;
    }

    // Handle other filters
    for (const key in filterParams) {
      if (filterParams[key]) {
        filterParams[key] = { $regex: filterParams[key], $options: "i" };
      }
    }

    return { ...query, ...filterParams };
  };

  const paginateProducts = (query, params, itemsPerPage) => {
    const page = Number(params.page) || 1;
    const skip = itemsPerPage * (page - 1);
    return query.limit(itemsPerPage).skip(skip);
  };

  // Get all products
  router.get("/products", async (req, res) => {
    try {
      const itemsPerPage = 10;
      let query = ProductSchema.find();

      let filterQuery = {};
      filterQuery = searchProducts(filterQuery, req.query);
      filterQuery = filterProducts(filterQuery, req.query);

      const filteredProductsCount = await ProductSchema.countDocuments(filterQuery);
      const totalProductsCount = await ProductSchema.countDocuments();

      query = ProductSchema.find(filterQuery);
      query = paginateProducts(query, req.query, itemsPerPage);

      const products = await query;

      res.status(200).json({
        success: true,
        totalProducts: totalProductsCount,
        filteredProducts: filteredProductsCount,
        itemsPerPage,
        products,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Get product by ID
  router.get("/product/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    try {
      const product = await ProductSchema.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Create new product
  router.post("/product", async (req, res) => {
    try {
      const {
        name,
        price,
        description,
        ratings,
        images,
        category,
        seller,
        stock,
      } = req.body;
      const product = await ProductSchema.create({
        name,
        price,
        description,
        ratings,
        images,
        category,
        seller,
        stock,
      });

      res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
      
        res.status(400).json({ error: err.message });
      }
  }
  );

  // Update product
  router.put("/product/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    try {
      const product = await ProductSchema.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete product
  router.delete("/product/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    try {
      const product = await ProductSchema.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully", product });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  // Suggestions
  const searchSuggestions = [
    "laptop",
    "smartphone",
    "headphones",
    "camera",
    "tablet",
    "gaming console",
    "printer",
    "5G smartphones",
    "intel laptops",
    "Amd laptops",
    "RTX Gaming Laptops",
    "Vivo",
    "Airpodes",
    "Nikon",
    "Boat"
  ];

  // Find matching suggestions
  const findSuggestions = (input) => {
    const matchedSuggestions = searchSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    return matchedSuggestions.slice(0, 6); // Limit to 6 suggestions
  };

  // Route for fetching search suggestions
  router.get("/search-suggestions", (req, res) => {
    const { input } = req.query;
    const suggestions = findSuggestions(input);
    res.json({ suggestions });
  });

  module.exports = router;
