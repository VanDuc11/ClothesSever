const Product = require('../models/product');

class HomeController {

    
    // get  /home
    index(req, res,next){

        if (!req.session.user) {
            res.redirect('/');
            return;
          } 

        Product.find({})
        .then((product) =>{
            
            res.render('home', {
                product: product.map(res =>res.toJSON())});
        })

        .catch(next);

       

    }
    async cht(req,res,next){
        const id = req.params.id;
        await Product.findOne({_id:id})
        .then((result) =>{
            res.render('productCt',{
                productCT: result.toJSON()})

            console.log(result);
        }).catch(next)
    }
}

module.exports = new HomeController;