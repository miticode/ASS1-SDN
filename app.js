const mongoose = require("mongoose");
const Category = require("./models/Category");
const Product = require("./models/Product");


mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(async () => {
    console.log("MongoDB connected");


    await Category.deleteMany({});
    await Product.deleteMany({});

    
    const categories = [
      { name: "Electronics" },
      { name: "Books" },
      { name: "Clothing" },
    ];

   
    const insertedCategories = await Category.insertMany(categories);
    console.log("Categories seeded:", insertedCategories);

   
    const products = [
      { name: "Laptop", price: 999.99, categoryId: insertedCategories[0]._id }, 
      {
        name: "Smartphone",
        price: 499.99,
        categoryId: insertedCategories[0]._id,
      }, 
      { name: "Novel", price: 15.99, categoryId: insertedCategories[1]._id }, 
      { name: "T-Shirt", price: 19.99, categoryId: insertedCategories[2]._id }, 
    ];

    
    await Product.insertMany(products);
    console.log("Products seeded:", products);

   
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
