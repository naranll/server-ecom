const express = require("express");
const cors = require("cors");
const fs = require("fs");
// const products = require("./DATA/products.json");
// const users = require("./DATA/users.json");
const cloudinary = require("cloudinary")
const multer = require("multer")

const app = express();
const port = 2020;
const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use(express.json());

//multer middleware


//cloudinary upload
cloudinary.config({
    cloud_name: "dc91nkhq6",
    api_key: "659977566675479",
    api_secret: "SwmIGEeuTS2tWd7pyXRWqeeY4ik"
});

const res = cloudinary.uploader.upload(
    '',
    { public_id: "olympic_flag" }
)

res.then((data) => {
    console.log(data);
    console.log(data.secure_url);
}).catch((err) => {
    console.log(err);
});

app.get("/products", (request, response) => {
    console.log("Requesting data axios");
    fs.readFile("./DATA/products.json", (error, productsData) => {
        if (error) {
            response.status(500).send({ message: "Error reading products" });
        } else {
            const products = JSON.parse(productsData);
            response.status(200).send(products);
        }
    })
})

app.post("/products", (request, response) => {
    console.log("Requesting to add a product");
    fs.readFile("./DATA/products.json", (error, productsData) => {
        if (error) {
            response.status(500).send({ message: "Error reading products" });
        } else {
            const products = JSON.parse(productsData);
            const newProduct = {
                id: Date.now().toString(),
                ...request.body
            };
            products.push(newProduct);

            fs.writeFile("./DATA/products.json", JSON.stringify(products), (err) => {
                if (err) {
                    response.status(500).send({ message: "Error writing file" });
                } else {
                    response.status(200).send({ message: "Product successfully added" });
                }
            })
        }
    })
})

app.delete("/products/:id", (request, response) => {
    const id = request.params.id;
    // console.log("To delete:", id);
    fs.readFile("./DATA/products.json", (error, productsData) => {
        if (error) {
            response.status(500).send({ message: "error reading file" });
        } else {
            const products = JSON.parse(productsData);
            const newProducts = products.filter((product) => product.id !== id);
            fs.writeFile("./DATA/products.json", JSON.stringify(newProducts), (err) => {
                if (err) {
                    response.status(500).send({ message: "error deleting product" });
                } else {
                    response.status(200).send({ message: "product deleted" });
                }
            })
        }
    })
})

app.patch("/products/:id", (request, response) => {
    const id = request.params.id;
    const editedProduct = request.body;
    // console.log("To edit:", id);
    fs.readFile("./DATA/products.json", (error, productsData) => {
        if (error) {
            response.status(500).send({ meassage: "error reading file" });
        } else {
            const products = JSON.parse(productsData);
            const index = products.indexOf(products.find(product => product.id === editedProduct.id));
            products[index] = editedProduct;
            fs.writeFile("./DATA/products.json", JSON.stringify(products), (err) => {
                if (err) {
                    response.status(500).send({ message: "error writing file" });
                } else {
                    response.status(200).send({ message: `updated product ${editedProduct.id}` });
                }
            })
        }
    })


})


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
