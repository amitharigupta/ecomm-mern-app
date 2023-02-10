const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");

require("./database/index");

const users = require("./data/users.js");
const products = require("./data/products.js");
const brands = require("./data/brands.js");
const categorys = require("./data/categorys.js");

const User = require("./models/user.models.js");
const Product = require("./models/product.models.js");
const Review = require("./models/review.models.js");
const Order = require("./models/order.models.js");
const Brand = require("./models/brand.models.js");
const Category = require("./models/category.models.js");

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Review.deleteMany()
        await Brand.deleteMany()
        await Category.deleteMany()
        await User.deleteMany()

        const createUser = await User.insertMany(users);

        const adminUser = createUser[0]._id
        
        const sampleDataBrand = brands.map(brand => {
            return {...brand, user: adminUser}
        })
       const brand = await Brand.insertMany(sampleDataBrand);
        
        const sampleDataCategory = categorys.map(category => {
            return {...category, user: adminUser}
        })

        // console.log(sampleDataCategory)

        const category = await Category.insertMany(sampleDataCategory);

        const sampleDataProduct = products.map(product => {
            delete product.brand;
            delete product.category;
            let brandId = brand[0]._id;
            let categoryId = category[0]._id;

            return { ...product, user: adminUser, brandId, categoryId }
        })
        console.log(sampleDataProduct);
        await Product.insertMany(sampleDataProduct);

        console.log(`Data Imported!`.green);
        process.exit();
    } catch (error) {
        console.log(`Error while importing data ${error}`.red);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Review.deleteMany()
        await Brand.deleteMany()
        await Category.deleteMany()
        await User.deleteMany()

        console.log(`Data Destroyed`.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error while destroying data ${error}`.red);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}