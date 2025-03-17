import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

const Navbar = ({ onOpen, onSearch }) => {

    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    }

    return (
        <div className="navbar bg-base-100 shadow-sm rounded">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Shopify</a>
            </div>

            {/* Center - Search Bar (Hidden on Small Screens) */}
            <div className="navbar-center hidden sm:inline">
                <label className="input flex items-center border rounded-lg px-2 py-1">
                    <svg
                        className="h-5 w-5 opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="ml-2 outline-none"
                        placeholder="Search"
                        onChange={handleSearchChange}
                    />
                </label>
            </div>

            {/* Add Product Button */}
            {/* Right Side - Add Product Button (Text Hidden on Small Screens) */}
            <div className="navbar-end">
                <Button
                    variant="outlined"
                    color="primary"
                    // startIcon={<AddIcon />}
                    onClick={() => onOpen("add")}
                    sx={{
                        minWidth: "unset",
                       
                        padding: { xs: 0.1, sm: 0.5 },
                        
                        borderColor: "blue",
                        color: "blue",
                        "&:hover": {
                            backgroundColor: "blue",
                            color: "white",
                        },
                    }}
                >
                    <AddIcon fontSize="small"/>
                    <span className="hidden md:inline">Add Product</span>
                </Button>
            </div>

        </div>
    )
}

export default Navbar