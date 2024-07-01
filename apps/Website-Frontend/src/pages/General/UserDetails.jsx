import React from 'react';

function UserDetails({ formData, handleChange, nextStep }) {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className='font-semibold text-2xl bg-[#022B3A] text-white p-4'>User Details</h2>
            <div className='p-6'>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="first_name" 
                        value={formData.first_name} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="last_name" 
                        value={formData.last_name} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button 
                    type="button" 
                    onClick={nextStep} 
                    className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserDetails;
