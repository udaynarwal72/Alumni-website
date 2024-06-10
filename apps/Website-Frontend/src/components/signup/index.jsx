import React, { useState, useEffect } from 'react';
import './signup.css';
import Footer from '../footer';
import NavBar from '../Navbar'

const branches = ['Computer Science', 'Electronics and Communication', 'Information Technology', 'Mechanical', 'Electrical', 'Civil', 'Production and Industrial Engineering', 'Mathematics and Computing', 'Industrial Internet of Things', 'Other'];

function SignupPage() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [fetchedCountries, setFetchedCountries] = useState([]);

    const countriesData = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
        "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
        "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
        "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
        "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
        "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait",
        "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
        "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
        "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
        "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
        "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
        "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan",
        "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
        "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
        "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    useEffect(() => {
        setFetchedCountries(countriesData);
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            setSelectedState('');
            setCities([]);

            const fetchStateAndCities = async () => {
                try {
                    const response = await fetch(
                        `https://ccsapi.up.railway.app/api/v1/search-db?search=${selectedCountry}&limit=10&offSet=10`
                    );
                    const data = await response.json();
                    console.log(data);
                    if (data.success && data.results.length > 0) {
                        const stateAndCity = data.results[0].csc.split(', ');
                        setStates(stateAndCity[1]); // Assuming the state is the second element
                        setCities([stateAndCity[0]]); // Assuming the city is the first element
                    }
                } catch (error) {
                    console.error("Error fetching state and cities:", error);
                }
            };

            fetchStateAndCities();
        }
    }, [selectedCountry]);


    return (
        <>
            <NavBar />
            <div className="parent-signup-container">
                <div className="signup-container">
                    <h1>Sign Up</h1>
                    <form action="/signup" method="post">
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
                                {fetchedCountries.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="state">State</label>
                            <select id="state" name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                                <option value="">Joining State</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">City</label>
                            <select id="city" name="city" required>
                                <option value="">Joining City</option>
                                {cities.map((city) => (
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
                                {branches.map((branch) => (
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
