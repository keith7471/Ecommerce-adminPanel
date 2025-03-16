import React, { useEffect } from 'react'
import { useState } from 'react'

const EditProductForm = ({ isOpen, onClose, formMode, onSubmit, productData }) => {

    const [sku, setSku] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImageUrl] = useState('https://img.icons8.com/color/48/image.png');
    // const [SKU, setSku] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData1 = { id: productData?.id, sku, product_name: productName, price, image_url }
            await onSubmit(productData1)
        }
        catch (err) {
            console.log('error adding data', err)
        }
        onClose(e);
    }

    useEffect(() => {
        if (formMode === 'edit' && productData) {
            console.log('sku', productData.sku)
            setSku(productData.sku);
            setProductName(productData.product_name);
            setPrice(productData.price);
            setImageUrl(productData.image_url);
        }
        else {
            setSku("");
            setProductName("");
            setPrice("");
            setImageUrl("https://img.icons8.com/color/48/image.png");
        }
    }, [formMode, productData,isOpen])

    return (
        <div>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className='font-bold text-lg py-4'>{formMode === 'add' ? 'Create Product' : 'Edit Product'}</h3>
                    <form method="dialog" onSubmit={handleSubmit}>
                        {/* Product SKU */}
                        <label className="floating-label">
                            <span>SKU</span>
                            <input type="text" placeholder="Product SKU" className="input input-md" value={sku} onChange={(e) => setSku(e.target.value)} />
                        </label>
                        <label className="floating-label mt-4">
                            <span>Product Name</span>
                            <input type="text" placeholder="Product Name" className="input input-md" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </label>
                        <label className="floating-label mt-4">
                            <span>Price</span>
                            <input type="text" placeholder="Price" className="input input-md" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </label>
                        <label className="floating-label mt-4">
                            <span>Product Image</span>
                            <input type="file" className="file-input file-input-sm" accept="image/*" onChange={handleFileUpload} />
                            {image_url && <img src={image_url} alt="Preview" className="mt-2 w-16 h-16 object-cover rounded" />}
                        </label>

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={onClose}
                        >✕</button>
                        <div className="flex justify-center mt-4">
                            <button className="btn btn-success">{formMode === 'add' ? 'Add Product' : 'Save Changes'}</button>
                            
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default EditProductForm