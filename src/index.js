const express = require("express");
const config = require("./shared/config");
const userRoutes = require("./routes/users");
const brandRoutes = require("./routes/brands");
const categoryRoutes = require("./routes/categories");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(userRoutes);
app.use(brandRoutes);
app.use(categoryRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti`);
});
