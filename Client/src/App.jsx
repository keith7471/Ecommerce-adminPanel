import { useState, useEffect, lazy } from 'react';
import Navbar from './components/Navbar';
// const ProdListTable = lazy(() => import('./components/ProdListTable'));
import ProdListTable from './components/ProdListTable'
import EditProductForm from './forms/EditProductForm';
import axios from 'axios';
// import { Suspense } from 'react';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [searchItem, setSearchItem] = useState('');
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce-adminpanel-7ue5.onrender.com/admin/products');
        setProductData(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenForm = (mode, prodData) => {
    setIsOpen(true);
    setFormMode(mode);
    setSelectedProduct(prodData);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
    // setSelectedProduct(null); // ✅ Reset selected product after closing
  };

  const handleSubmit = async (newProductData) => {
    try {
      if (formMode === 'add') {
        const response = await axios.post('https://ecommerce-adminpanel-7ue5.onrender.com/admin/products', newProductData);
        setProductData((prevData) => [...prevData, response.data]);  // Add new product
      } else {
        try {
          const response = await axios.put(`https://ecommerce-adminpanel-7ue5.onrender.com/admin/products/${selectedProduct.id}`, newProductData);

          console.log("the new edit data", response.data)

          setProductData((prevData) =>
            prevData.map((product) =>
              product.id === selectedProduct.id ? response.data : product
            ));

        }
        catch (err) {
          console.log("Error updating the product", err)
        }
      }

    }
    catch (err) {
      console.error('Error saving the product:', err);
    }

    handleCloseForm();
  };

  return (
    <div className='px-5 py-2'>
      <Navbar onOpen={handleOpenForm} onSearch={setSearchItem} />
      {/* <Suspense
        fallback={
          <div className="flex justify-center items-center h-[75vh]">
            <span className="loading loading-spinner loading-2xl text-blue-500 w-15 h-15">Loading</span>
          </div>
        }
      > */}
        <ProdListTable
          handleOpenForm={handleOpenForm}
          searchItem={searchItem}
          setProductData={setProductData}
          productData={productData}
        />
      {/* </Suspense> */}
      <EditProductForm
        isOpen={isOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        formMode={formMode}
        productData={selectedProduct}
      />
    </div>
  );
}

export default App;
