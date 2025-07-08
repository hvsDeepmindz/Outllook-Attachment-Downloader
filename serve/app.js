const logger = require('./logger');

let NODE_ENV = process.env.NODE_ENV || "development";
require('dotenv').config({ path: ".env." + NODE_ENV });
logger.info(`ENV :${NODE_ENV}`);
 
 
let PORT = process.env.PORT || 5000;
let path = require('path');
if (!PORT) {
    logger.error(`PORT NOT DEFINED!`);
    return
}
logger.info(`PORT :${PORT}`);
 
const express = require('express');
const app = express();
 
console.log(process.env.VITE_BASE_PATH);
app.use(`${(process.env.VITE_BASE_PATH != '' ) ? `/${process.env.VITE_BASE_PATH}`: '/'}`,express.static(path.join(__dirname, "build")))
// app.use(express.static(path.join(__dirname, 'v3')))
 
 
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname,'build','index.html'))
});
 
app.listen(PORT, () => {
    logger.info(`SERVER STARTED ON PORT ${PORT}`)
})