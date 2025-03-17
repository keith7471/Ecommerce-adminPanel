import {query} from "../db.js"


export const getProducts = async() =>{
    // const {rows} = await query('Select * from products_db')
    const {rows} = await query('Select * from products')
    return rows;
}


export const createProducts = async(productData) =>{
    const {sku,name,price,image_url} = productData;
    const {rows} = await query(
        `insert into products(sku,name,price,image_url)
        values($1, $2,$3,$4) returning *`,[sku,name,price,image_url]
    );
    return rows[0];
}

export const updateProducts = async (productData, productId) => {
    const { sku, name, price, image_url } = productData;
    const { rows } = await query(
        `UPDATE products
         SET sku=$1, name=$2, price=$3, image_url=$4 
         WHERE id=$5 
         RETURNING *`,
        [sku, name, price, image_url, productId]
    );
    return rows[0];
};

export const deleteProduct = async(productId) =>{
    const {rowCount} = await query(
        `delete from products where id=$1`,
        [productId]);
        return rowCount > 0;   
}

export const searchProducts = async(searchedProduct) =>{
    const {rows} = await query(
        `select * from products where name ILIKE $1`,
        [`%${searchedProduct}%`]
    )
    return rows;
}