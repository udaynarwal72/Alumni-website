import React from 'react';

function AccountDetails({ formData, handleChange, prevStep, handleSubmit, handleChangeChecked }) {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className='font-semibold text-2xl bg-[#022B3A] text-white p-4'>Account Details</h2>
            <div className='p-6'>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input 
                        type="tel" 
                        id="phoneNumber" 
                        name="phone_number" 
                        value={formData.phone_number} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className='flex items-center mt-2'>
                        <input 
                            type="checkbox" 
                            id="phone_visible" 
                            checked={formData.phone_visible} 
                            onChange={handleChangeChecked} 
                            name="phone_visible" 
                            className="mr-2 leading-tight"
                        />
                        <label htmlFor="phone_visible" className="text-gray-700 text-sm">Phone number visible</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                    <input 
                        type="date" 
                        id="dob" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className='flex justify-between'>
                    <button 
                        type="button" 
                        onClick={prevStep} 
                        className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Previous
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSubmit} 
                        className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
