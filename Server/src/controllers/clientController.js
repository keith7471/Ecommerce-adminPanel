
import * as clientService from "../services/clientServices.js"

export const getProducts = async(req,res) =>{
    try{
        const clients = await clientService.getProducts();
        res.status(200).json(clients)
    }
    catch(err){
        console.error('error fetching client',err);
        res.status(500).json({message:'Internal Server error'})
    }
};

export const createProducts = async(req,res) =>{
    try{
        const productData = req.body;
        const newProduct = await clientService.createProducts(productData);
        res.status(200).json(newProduct) ;

    }
    catch(err){
        console.log("The error is",err)
        res.status(500).json({message:'Internal Server error!!'})
    }
};

export const updateProducts = async(req,res) =>{
    try{
        const clientId = req.params.id;
        // res.status(200).json(newProduct) ;
        const productData = req.body;
        const updatedProduct = await clientService.updateProducts(productData,clientId);
        if(!updatedProduct){
            return res.status(404).json({message:'client not found'})
        }
        res.status(200).json(updatedProduct);
    }
    catch(err){
        console.log("The error is",err)
        res.status(500).json({message:'Internal Server error!!'})
    }
};

export const deleteProduct = async(req,res) =>{
    try{
        const clientId = req.params.id;
        // res.status(200).json(newProduct) ;
        const productData = req.body;
        const deletedProduct = await clientService.deleteProduct(clientId);
        if(!deletedProduct){
            return res.status(404).json({message:'Product not found'})
        }
        res.status(200).send('product found and deleted!')
    }
    catch(err){
        console.log("The error in deleting the product",err)
        res.status(500).json({message:'Internal Server error!!'})
    }
};

export const searchProduct = async(req,res) =>{
    try{
        const searchProd = req.query.alpha;           //query paramter in url(alpha is query para assigned)
        const products = await clientService.searchProducts(searchProd);
        res.status(200).json(products);
    }
    catch(err){
        console.log("The error in searching the product",err)
        res.status(500).json({message:'Internal Server error!!'})
    }
}

