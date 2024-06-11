import React, { useState, useEffect } from 'react';
import './signup.css';
import Footer from '../footer';
import NavBar from '../Navbar';
import dataCountry from '../../../../../src/countries.json';
import dataState from '../../../../../src/states.json';

const branches = [
    'Computer Science', 'Electronics and Communication', 'Information Technology',
    'Mechanical', 'Electrical', 'Civil', 'Production and Industrial Engineering',
    'Mathematics and Computing', 'Industrial Internet of Things', 'Other'
];

function SignupPage() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [fetchedCountries, setFetchedCountries] = useState([]);

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

    return (
        <>
            <NavBar />
            <div className="parent-signup-container">
                <div className="signup-container">
                    <h1>Sign Up</h1>
                    <form action="/" method="post">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <div className="name-fields">
                                <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
                                <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="joiningBatch">Joining Batch</label>
                            <input type="text" id="joiningBatch" name="joiningBatch" required />
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
                            <label htmlFor="organisation">Organisation</label>
                            <input type="text" id="organisation" name="organisation" required />
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
                            <input type="tel" id="phoneNumber" name="phoneNumber" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="dob" required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignupPage;
