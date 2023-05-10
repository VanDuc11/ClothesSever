const Product = require('../models/product');
var mongoose = require('mongoose');
var path = require('path')

class ProductController {

    index(rep, res, next) {
        Product.find({})
            .then((product) => {

                res.render('product', {
                    product: product.map(res => res.toJSON())
                });
            })

            .catch(next);
    }
    create(rep, res) {
        res.render('create');
    }
    async create_data(req, res) {
        const img = path.basename(req.file.path);
        const product = new Product({
            name: req.body.name,
            image: img,
            soluong: req.body.soluong,
            status: req.body.status,
            price: req.body.price,
            loai: req.body.loai,
        });
        console.log(product);
        const edit = req.body.id;
        try {
            if (!edit) {
                // thêm
                await product.save()
                res.send('<script>alert("Thêm sản phẩm thành công"); window.location.href="/product";</script>');
                
                console.log("Thêm thành công");
            } else {
                //update
                await Product.updateOne({ _id: edit },
                    {
                        $set: {
                            name: req.body.name,
                            image: img,
                            soluong: req.body.soluong,
                            status: req.body.status,
                            price: req.body.price,
                            loai: req.body.loai,
                        }
                    });
                res.send(`<script>alert("Update sản phẩm thành công: ${edit}"); window.location.href="/product";</script>`);

            }
        } catch (error) {

        }

    }

    //GET [] /:ID/EDIT
    async delete(rep, res, next) {
        const id = rep.params.id;

        try {
            const document = await Product.findById(id);
            Product.deleteOne({ _id: document._id })
                .then((result) => {
                    console.log(`Deleted ${result.deletedCount}`);
                    res.status(200).json({ message: 'User removed successfully' });
                })
            console.log(document._id);

        } catch (error) {
            console.log(error);

        }

    }

    show(rep, res, next) {
        res.send("create1111")
    }
}

module.exports = new ProductController;