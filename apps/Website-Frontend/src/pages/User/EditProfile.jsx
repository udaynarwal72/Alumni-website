import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import "../../styles/EditProfile.css";
import dataCountry from '../../../../../src/countries.json';
import dataState from '../../../../../src/states.json';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
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
    }, [selectedState]);


	return (
		<>
			<NavBar />
            <div className="parent-edit-prof">
			<div className="signup-container">
                    <h1>Want to Edit?</h1>
                    <h3>Here you Go!</h3>
                    <form  encType="multipart/form-data">
                        <div className="input-group">
                            <label htmlFor="username">Linkedin Profile</label>
                            <input type="text" id="username" name="username" value="Given" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="firstName">Instagram Profile</label>
                            <input type="text" id="firstName" name="first_name" value="Given" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Twitter Profile</label>
                            <input type="text" id="lastName" name="last_name" value="Given" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="joiningBatch">Email</label>
                            <input type="text" id="joiningBatch" name="joining_batch" value="Given" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Current Country</label>
                            <select id="country" name="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
                                <option value="">Given</option>
                                {fetchedCountries.map(country => (
                                    <option key={country} value={country}>{country.split('+')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="state">Current State</label>
                            <select id="state" name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                                <option value="">Given</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state.split('+')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">Current City</label>
                            <select id="city" name="city" required>
                                <option value="">Given</option>
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
                            <label htmlFor="organisation">Company</label>
                            <input type="text" id="organisation" maxLength="16" name="organisation" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="designation">Designation</label>
                            <input type="text" id="designation" maxLength="20" name="designation" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Hobby</label>
                            <input type="hobby" id="email" name="email" required />
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
                        <label>Achievements:</label>
                        <textarea name="achievements" placeholder="Any achievements that you want to share.." />
                        </div>
                        <div className="input-group">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="file" id="avatar" name="avatar" accept="image/*" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="coverImage">Cover Image</label>
                            <input type="file" id="coverImage" name="coverImage" accept="image/*" />
                        </div>
                        <button type="submit" className='sign-up-button'>Click to Change</button>
                    </form>
                </div>
            </div>
            <Footer />
		</>
	);
};

export default EditProfile;
