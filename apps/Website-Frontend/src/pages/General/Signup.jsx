import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/SignUp.css';
import NavBar from '../../components/Navbar';
import UserDetails from './UserDetails';
import AddressDetails from './AddressDetails';
import ProfileDetails from './ProfileDetails';
import AccountDetails from './AccountDetails';
import dataCountry from '../../../../../src/countries.json';
import dataState from '../../../../../src/states.json';
import { useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const branches = [
    'Computer Science', 'Electronics and Communication Engineering', 'Information Technology',
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Production and Industrial Engineering',
    'Mathematics and Computing', 'Industrial Internet of Things', 'MBA', 'MCA', 'Ph.D', 'Other'
];

function SignupPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        joining_batch: '',
        joining_country: '',
        joining_state: '',
        joining_city: '',
        address: '',
        branch: '',
        organisation: '',
        designation: '',
        email: '',
        password: '',
        phone_number: '',
        phone_visible: true,
        dob: '',
        avatar: null,
        coverImage: null,
    });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const [crop, setCrop] = useState({ aspect: 1 });
    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedCoverImage, setCroppedCoverImage] = useState(null);
    const [avatar,setAvatar] = useState('')
    const [coverImage,setCoverImage] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const userCountries = dataCountry.map(country => `${country.name}+${country.id}+${country.iso2}`);
        setFetchedCountries(userCountries);
    }, []);

    useEffect(() => {
        if (formData.joining_country) {
            const selectedCountryId = formData.joining_country.split('+')[1];
            const userStates = dataState.filter(state => state.country_id == selectedCountryId);
            setStates(userStates.map(state => `${state.name}+${state.id}+${state.iso2}`));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [formData.joining_country]);

    useEffect(() => {
        if (formData.joining_state) {
            const selectedCountryIso2 = formData.joining_country.split('+')[2];
            const selectedStateIso2 = formData.joining_state.split('+')[2];
            var headers = new Headers();
            headers.append("X-CSCAPI-KEY", "UEFXY210QzFpUzlLdlpUTUlBelNrNjVNcUJwS2xYSjUzMGlMY3UxTg==");

            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

            fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryIso2}/states/${selectedStateIso2}/cities`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setCities(result.map(city => city.name));
                })
                .catch(error => console.log('error', error));
        } else {
            setCities([]);
        }
    }, [formData.joining_state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeChecked = () => {
        setFormData({
            ...formData,
            phone_visible: !formData.phone_visible
        });
    };

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a new object to include both the form data and the images
        let formDataWithImages = { ...formData };
    
        if (croppedImage) {
            formDataWithImages.avatar = croppedImage;
        }
        if (croppedCoverImage) {
            formDataWithImages.coverImage = croppedCoverImage;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithImages)
            });
    
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
    
            const data = await response.json();
            console.log(data);
            navigate('/signin');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };
    

    const onImageCropComplete = useCallback((croppedArea, croppedAreaPixels, setCroppedImage) => {
        setCroppedImage(croppedAreaPixels);
    }, []);

    const createCroppedImage = async (image, croppedAreaPixels) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const imageElement = new Image();
        imageElement.src = image;

        return new Promise((resolve) => {
            imageElement.onload = () => {
                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;
                ctx.drawImage(
                    imageElement,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height
                );
                canvas.toBlob((blob) => {
                    resolve(blob);
                });
            };
        });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <>
            <NavBar />
            <div className="parent-signup-container">
                <div className="signup-container">
                    {step === 1 && <UserDetails formData={formData} handleChange={handleChange} nextStep={nextStep} />}
                    {step === 2 && <AddressDetails formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} fetchedCountries={fetchedCountries} states={states} cities={cities} />}
                    {step === 3 && <ProfileDetails formData={formData} branches={branches} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} handleImageChange={handleImageChange} setAvatar={setAvatar} setCoverImage={setCoverImage} crop={crop} setCrop={setCrop} onImageCropComplete={onImageCropComplete} />}
                    {step === 4 && <AccountDetails formData={formData} handleChange={handleChange} prevStep={prevStep} handleSubmit={handleSubmit} handleChangeChecked={handleChangeChecked} />}
                </div>
            </div>
        </>
    );
}

export default SignupPage;
