import React from 'react';

function AddressDetails({ formData, handleChange, prevStep, nextStep, fetchedCountries, states, cities }) {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className='font-semibold text-2xl bg-[#022B3A] text-white p-4'>Address Details</h2>
            <div className='p-6'>
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                    <select 
                        id="country" 
                        name="joining_country" 
                        value={formData.joining_country} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Joining Country</option>
                        {fetchedCountries.map(country => (
                            <option key={country} value={country}>{country.split('+')[0]}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <select 
                        id="state" 
                        name="joining_state" 
                        value={formData.joining_state} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Joining State</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state.split('+')[0]}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <select 
                        id="city" 
                        name="joining_city" 
                        value={formData.joining_city} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Joining City</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={formData.address} 
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
                        onClick={nextStep} 
                        className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddressDetails;
