const express = require("express");
const path = require("path");
const config = require("./src/shared/config");
const userRoutes = require("./src/routes/users");
const orderRoutes = require("./src/routes/orders");
const categoryRoutes = require("./src/routes/categories");
const productRoutes = require("./src/routes/products");
const vacanciesRoutes = require("./src/routes/vacancies");
const bannerRoutes = require("./src/routes/banner");

const app = express();
app.use(express.json());
console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(orderRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(vacanciesRoutes);
app.use(bannerRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port} - portda ishlayapti`);
});
