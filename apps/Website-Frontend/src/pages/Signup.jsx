import React, { useState, useEffect } from 'react';
import '../styles/SignUp.css';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import dataCountry from '../../../../src/countries.json';
import dataState from '../../../../src/states.json';
import { useNavigate } from 'react-router-dom';

const branches = [
    'Computer Science', 'Electronics and Communication Engineering', 'Information Technology',
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Production and Industrial Engineering',
    'Mathematics and Computing', 'Industrial Internet of Things', 'Other'
];

function SignupPage() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const navigate = useNavigate(); // useNavigate hook used correctly within the component

    useEffect(() => {
        const userCountries = dataCountry.map(country => `${country.name}+${country.id}+${country.iso2}`);
        setFetchedCountries(userCountries);
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const selectedCountryId = selectedCountry.split('+')[1];
            const userStates = dataState.filter(state => state.country_id == selectedCountryId);
            setStates(userStates.map(state => `${state.name}+${state.id}+${state.iso2}`));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            const selectedCountryIso2 = selectedCountry.split('+')[2];
            const selectedStateIso2 = selectedState.split('+')[2];
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
    }, [selectedState, selectedCountry]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/api/v1/user/signup', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            console.log(data); // Handle successful registration response
            navigate('/signin'); // Use navigate hook to redirect after successful signup
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="parent-signup-container">
                <div className="signup-container">
                    <h1>Welcome</h1>
                    <h3>Join the RECNITKA Family</h3>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="first_name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="last_name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="joiningBatch">Joining Batch</label>
                            <input type="text" id="joiningBatch" name="joining_batch" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
                                <option value="">Joining Country</option>
                                {fetchedCountries.map(country => (
                                    <option key={country} value={country}>{country.split('+')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="state">State</label>
                            <select id="state" name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                                <option value="">Joining State</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state.split('+')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">City</label>
                            <select id="city" name="city" required>
                                <option value="">Joining City</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="branch">Branch</label>
                            <select id="branch" name="branch" required>
                                <option value="">Select Branch</option>
                                {branches.map(branch => (
                                    <option key={branch} value={branch}>{branch}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="organisation">Company</label>
                            <input type="text" id="organisation" name="organisation" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="designation">Designation</label>
                            <input type="text" id="designation" name="designation" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phone_number" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="dob" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="file" id="avatar" name="avatar" accept="image/*" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="coverImage">Cover Image</label>
                            <input type="file" id="coverImage" name="coverImage" accept="image/*" />
                        </div>
                        <button type="submit" className='sign-up-button'>Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignupPage;
