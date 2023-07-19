const express = require("express");
const config = require("./shared/config");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const vacanciesRoutes = require("./routes/vacancies");
const bannerRoutes = require("./routes/banner");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(userRoutes);
app.use(orderRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(vacanciesRoutes);
app.use(bannerRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port} - portda ishlayapti`);
});
