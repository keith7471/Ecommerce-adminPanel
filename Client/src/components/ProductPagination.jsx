import React from 'react';
import { Pagination } from '@mui/material';

const ProductPagination = ({ count, page, onChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <Pagination 
        count={count}  // Total number of pages
        page={page}    // Current active page
        onChange={onChange} // Function to handle page change
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default ProductPagination;
