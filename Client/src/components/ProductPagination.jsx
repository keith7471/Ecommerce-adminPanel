import React from 'react';
import { Pagination } from '@mui/material';

const ProductPagination = ({ count, page, onChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        count={count} // Total pages
        page={page} // Active page
        onChange={onChange} // Handle page change
        variant="outlined"
        shape="rounded"
        size="small"
        sx={{
          "& .MuiPaginationItem-root": {
            transition: "0.3s",
          },
          "& .Mui-selected": {
            backgroundColor: "#3B82F6 !important", // Blue background
            color: "white !important", // White text
            borderColor: "#3B82F6 !important",
          },
        }}
      />

    </div>
  );
};

export default ProductPagination;
