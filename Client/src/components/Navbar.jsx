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
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>

                </div>
                <a className="btn btn-ghost text-xl">Shopify</a>
            </div>

            <div className='navbar-center'>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" className="grow" placeholder="Search" onChange={handleSearchChange} />
                    {/* <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd> */}
                </label>
            </div>

            {/* Add Product Button */}
            <div className="navbar-end">
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => onOpen('add')}
                    sx={{
                        borderColor: 'blue',
                        color: 'blue',
                        '&:hover': {
                            backgroundColor: 'blue',
                            color: 'white', 
                        },
                    }}
                >
                    Add Product
                </Button>
            </div>

        </div>
    )
}

export default Navbar