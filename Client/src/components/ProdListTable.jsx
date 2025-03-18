import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ProductPagination from './ProductPagination.jsx';


const ProdListTable = ({ handleOpenForm, searchItem, setProductData, productData }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust based on your needs

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ecommerce-adminpanel-7ue5.onrender.com/admin/products');
                setProductData(response.data);
            } catch (err) {
                console.error(err)
            }
        };

        fetchData();

        return () => controller.abort(); // Cleanup function to abort fetch request
    }, []);

    const filteredProductsData = productData.filter(prod =>
        prod.product_name?.toLowerCase().includes(searchItem.toLowerCase()) ||
        prod.sku?.toLowerCase().includes(searchItem.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://ecommerce-adminpanel-7ue5.onrender.com/admin/products/${id}`);

                // ✅ Immediately update the UI by removing the deleted item
                setProductData((prevData) => prevData.filter(prod => prod.id !== id));
            } catch (err) {
                console.error('Error deleting product:', err.message);
            }
        }
    };

    // Get paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProductsData.slice(indexOfFirstItem, indexOfLastItem);
    // Handle pagination change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className='mt-3'>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 py-2 px-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductsData.length > 0 ? (
                            currentProducts.map((prodItem, index) => (
                                <tr key={prodItem.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{prodItem.sku}</td>
                                    <td>{prodItem.product_name}</td>
                                    <td>${prodItem.price || 'N/A'}</td>
                                    <td>
                                        <img
                                            src={prodItem.image_url || 'https://img.icons8.com/color/48/image.png'}
                                            className="w-14 h-14 object-cover rounded hover:cursor-pointer transition-transform hover:scale-110"
                                            alt="Product"
                                        />
                                    </td>
                                    <td className="px-1 flex gap-2">
                                        {/* Edit Button - Blue */}
                                        <IconButton color="primary" onClick={() => handleOpenForm('edit', prodItem)}>
                                            <EditIcon />
                                        </IconButton>

                                        {/* Delete Button - Red */}
                                        <IconButton color="error" onClick={() => handleDelete(prodItem.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="flex justify-center items-center h-[50vh]">
                                        <span className="loading loading-spinner text-blue-500 w-14 h-14"></span>
                                    </div>
                                    {/* <p className="text-gray-500 mt-2">No products found</p> */}
                                </td>
                            </tr>

                        )}
                    </tbody>
                </table>

            </div>
            {/* <hr className="border-gray-300 my-12" /> */}
            {/* Pagination */}
            {
                filteredProductsData.length > 0 && (
                    <div className="fixed bottom-2 left-0 w-full bg-white shadow-md py-3 flex justify-center">
                        <ProductPagination
                            count={Math.ceil(filteredProductsData.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                )
            }
        </div >
    );
};

export default ProdListTable;
