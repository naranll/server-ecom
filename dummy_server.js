// console.log("hello");
const express = require("express");
const cors = require("cors");
const data = require("./DATA/products.json");

const app = express();
const port = 2030;
app.use(cors());
// console.log(data);

app.get("/products", (request, response) => {
    response.status(200).send(data);
    response.json();
    console.log(response);
})

app.post("/products",(request, response) => {
    // const newProduct = {
    //     id: data[data.lenght - 1].id + 1,
    //     ...request.body
    // }
    // // data.push(newProduct);
    // response.send("new obj in server", newProduct)
    console.log("new obj from modal",request.body);
    response.send("trying to work post")
    // console.log("updated products", products);
})

app.delete("/products", (req, res) => {
    console.log("wants to delete");
    res.send("not working del")
})

app.listen(port, ()=>{
    console.log(`server is working on port ${port}`);
})