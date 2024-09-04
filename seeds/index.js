var mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
var Product = require('../models/product');

mongoose
  .connect("mongodb://localhost:27017/phoneproducts")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

const brands = ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo', 'OnePlus', 'Google', 'Sony'];
const models = {
  'Apple': ['iPhone 13', 'iPhone 12', 'iPhone 11', 'iPhone SE'],
  'Samsung': ['Galaxy S21', 'Galaxy S20', 'Galaxy Note 20', 'Galaxy A52'],
  'Huawei': ['P40', 'Mate 40', 'Nova 8', 'Y7a'],
  'Xiaomi': ['Mi 11', 'Redmi Note 10', 'Poco X3', 'Mi A3'],
  'Oppo': ['Reno6', 'Find X3', 'A94', 'A15'],
  'OnePlus': ['OnePlus 9', 'OnePlus 8', 'OnePlus Nord', 'OnePlus 7T'],
  'Google': ['Pixel 5', 'Pixel 4a', 'Pixel 4', 'Pixel 3a'],
  'Sony': ['Xperia 5', 'Xperia 10', 'Xperia 1', 'Xperia L4'],
};

const seedDB = async () => {
  await Product.deleteMany({});
  for(let i = 0; i < 50; i++) {
    const brand = faker.helpers.arrayElement(brands);
    const model = faker.helpers.arrayElement(models[brand]);
    const product = new Product({
        author: '66cdd5cb0f66913ba48ceb53',
        brand: brand,
        model: model,
        releaseDate: faker.date.past({ years: 5 }),  // Đã cập nhật cú pháp
        price: faker.commerce.price({ min: 100, max: 1000 }),  // Đã cập nhật cú pháp
        specifications: {
          screenSize: faker.helpers.arrayElement(['5.5"', '6.1"', '6.7"']),
          batteryCapacity: faker.helpers.arrayElement(['3000mAh', '4000mAh', '5000mAh']),
          camera: faker.helpers.arrayElement(['12MP', '48MP', '108MP']),
          processor: faker.helpers.arrayElement(['Snapdragon', 'Exynos', 'A14 Bionic']),
          storage: faker.helpers.arrayElement(['64GB', '128GB', '256GB']),
          ram: faker.helpers.arrayElement(['4GB', '6GB', '8GB']),
          operatingSystem: faker.helpers.arrayElement(['Android', 'iOS']),
        },
        images: [
          {
            url: "https://th.bing.com/th/id/OIP.AGy2OUk-ox8DxAmRRRa4rQHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",  // URL ảnh giả định
            filename: "placeholder_image"
          }
        ],
        available: faker.datatype.boolean(),
        createdAt: faker.date.recent(),
      });
    await product.save();
  }
};

seedDB()
  .then(() => mongoose.disconnect())
  .catch((err) => console.error("Seeding error", err));
