import React from 'react';
import ReactCrop from 'react-image-crop';

function ProfileDetails({ formData, handleChange, branches, prevStep, nextStep, handleImageChange, setAvatar, setCoverImage, crop, setCrop, onImageCropComplete }) {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className='font-semibold text-2xl bg-[#022B3A] text-white p-4'>Profile Details</h2>
            <div className='p-6'>
                <div className="mb-4">
                    <label htmlFor="branch" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                    <select 
                        id="branch" 
                        name="branch" 
                        value={formData.branch} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="organisation" className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                    <input 
                        type="text" 
                        id="organisation" 
                        name="organisation" 
                        value={formData.organisation} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                    <input 
                        type="text" 
                        id="designation" 
                        name="designation" 
                        value={formData.designation} 
                        onChange={handleChange} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">Profile Photo:</label>
                    <input 
                        type="file" 
                        id="avatar" 
                        name="avatar" 
                        className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(e, setAvatar)} 
                    />
                    {formData.avatar && (
                        <ReactCrop
                            src={formData.avatar}
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={(croppedArea, croppedAreaPixels) => onImageCropComplete(croppedArea, croppedAreaPixels, setAvatar)}
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="coverImage" className="block text-gray-700 text-sm font-bold mb-2">Family Photo:</label>
                    <input 
                        type="file" 
                        id="coverImage" 
                        name="coverImage" 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(e, setCoverImage)} 
                        className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {formData.coverImage && (
                        <ReactCrop
                            src={formData.coverImage}
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={(croppedArea, croppedAreaPixels) => onImageCropComplete(croppedArea, croppedAreaPixels, setCoverImage)}
                        />
                    )}
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

export default ProfileDetails;
