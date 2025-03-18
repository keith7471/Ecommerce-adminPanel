import React, { useEffect, useState } from "react";

const EditProductForm = ({ isOpen, onClose, formMode, onSubmit, productData }) => {
    const defaultImage = "https://img.icons8.com/color/48/image.png";

    // State for form fields
    const [sku, setSku] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState(defaultImage);

    // Handle File Upload (Convert to Base64)
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { id: productData?.id, sku, product_name: productName, price, image_url: imageUrl };
            await onSubmit(updatedProduct);
            onClose();
        } catch (err) {
            console.error("Error adding data:", err);
        }
    };

    // Update form values when editing
    useEffect(() => {
        if (formMode === "edit" && productData) {
            setSku(productData.sku || "");
            setProductName(productData.product_name || "");
            setPrice(productData.price || "");
            setImageUrl(productData.image_url || defaultImage);
        } else {
            setSku("");
            setProductName("");
            setPrice("");
            setImageUrl(defaultImage);
        }
    }, [formMode, productData, isOpen]);

    return (
        <dialog id="edit_product_modal" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">{formMode === "add" ? "Create Product" : "Edit Product"}</h3>
                <form onSubmit={handleSubmit}>
                    {/* SKU */}
                    <label className="floating-label">
                        <span>SKU</span>
                        <input
                            type="text"
                            placeholder="Product SKU"
                            className="input input-md w-full"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </label>

                    {/* Product Name */}
                    <label className="floating-label mt-4">
                        <span>Product Name</span>
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-md w-full"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </label>

                    {/* Price */}
                    <label className="floating-label mt-4">
                        <span>Price</span>
                        <input
                            type="number"
                            placeholder="Price"
                            className="input input-md w-full"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>

                    {/* Image Upload */}
                    <label className="floating-label mt-4">
                        <span>Product Image</span>
                        <input type="file" className="file-input file-input-sm w-full" accept="image/*" onChange={handleFileUpload} />
                        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-16 h-16 object-cover rounded" />}
                    </label>

                    {/* Close Button */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} type="button">
                        ✕
                    </button>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-4">
                        <button className="btn btn-success" type="submit">
                            {formMode === "add" ? "Add Product" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditProductForm;
