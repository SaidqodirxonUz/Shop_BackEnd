const express = require("express");
const config = require("./shared/config");
const userRoutes = require("./routes/users");
const brandRoutes = require("./routes/brands");
const categoryRoutes = require("./routes/categories");
<<<<<<< HEAD
const productRoutes = require("./routes/products");
=======
const vacanciesRoutes = require("./routes/vacancies");
const bannerRoutes = require("./routes/banner");
>>>>>>> de9acae3ebd1a6b4127303946ee00b22af52f235

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(userRoutes);
app.use(brandRoutes);
app.use(categoryRoutes);
<<<<<<< HEAD
app.use(productRoutes);
=======
app.use(vacanciesRoutes);
app.use(bannerRoutes);
>>>>>>> de9acae3ebd1a6b4127303946ee00b22af52f235

app.listen(config.port, () => {
  console.log(`Server ${config.port} - portda ishlayapti`);
});
