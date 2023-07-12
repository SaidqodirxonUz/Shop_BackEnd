const express = require("express");
const config = require("./shared/config");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(userRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti`);
});
