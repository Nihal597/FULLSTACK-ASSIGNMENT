import dotenv from "dotenv";

dotenv.config();

import express from "express";
import routes from "./routes/index.js";
import swaggerRoute from "./routes/swagger-ui.js";
import cors from "cors"

const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const PORT = 3000;

app.use("/swagger",swaggerRoute);
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`App Started at port ${PORT}`);
})

