import NavBar from "../../components/Navbar";
import Footer from "../../components/footer"; // Adjusted casing here
import "../../styles/EditProfile.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from "recoil";
import { authState } from '../../Recoil/Authuser';
import axios from "axios";
import dataCountry from '../../../../../src/countries.json';
import dataState from '../../../../../src/states.json';

const branches = [
    'Computer Science', 'Electronics and Communication Engineering', 'Information Technology',
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Production and Industrial Engineering',
    'Mathematics and Computing', 'Industrial Internet of Things', 'Other'
];

const EditProfile = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [userData, setUserData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        joining_batch: '',
        current_country: '',
        current_state: '',
        current_city: '',
        address: '',
        branch: '',
        organisation: '',
        designation: '',
        email: '',
        phone_number: '',
        dob: '',
        linkedin_profile: '',
        instagram_handle: '',
        twitter_handle: '',
        facebook_profile: '',
        hobbies: '',
        awards: '',
        children_name: '',
        marriage_anniversary: ''
    });

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const [checked, setChecked] = useState(''); // Adjusted initial state

    const navigate = useNavigate();

    useEffect(() => {
        setUserData(auth.user || {});
    }, [auth.user]);

    useEffect(() => {
        console.log("this is phone_visible:", userData.phone_visible)
        if (userData.phone_visible == true) {
            setChecked('on');
        }
    }, [userData.phone_visible]);

    useEffect(() => {
        const userCountries = dataCountry.map(country => `${country.name}+${country.id}+${country.iso2}`);
        setFetchedCountries(userCountries);
    }, []);

    const handleChange = () => {
        setChecked(!checked);
    };

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

    const changeUserDetail = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await axios.put('http://localhost:3000/api/v1/user/profileupdate', formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = response.data;
            if (response.status === 200) {
                toast.success(data.message);
                setAuth({
                    ...auth,
                    user: data.data,
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    // Format date to yyyy-mm-dd
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <NavBar />
            <div className="parent-edit-prof">
                <div className="signup-container">
                    <h1>Want to Edit?</h1>
                    <h3>Here you Go!</h3>
                    <form onSubmit={changeUserDetail} encType="multipart/form-data">
                        <div className="input-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" defaultValue={userData.username} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="first_name">First Name:</label>
                            <input type="text" id="first_name" name="first_name" defaultValue={userData.first_name} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="last_name">Last Name:</label>
                            <input type="text" id="last_name" name="last_name" defaultValue={userData.last_name} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="joining_batch">Joining Batch:</label>
                            <input type="number" id="joining_batch" name="joining_batch" defaultValue={userData.joining_batch} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Country:</label>
                            <select id="country" name="current_country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}  >
                                <option value="">{userData.current_country}</option>
                                {fetchedCountries.map(country => (
                                    <option key={country} value={country}>{country.split('+')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="state">State:</label>
                            <select id="state" name="current_state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}  >
                                <option value="">{userData.current_state}</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state.split('+')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">City:</label>
                            <select id="city" name="current_city"  >
                                <option value="">{userData.current_city}</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" defaultValue={userData.address} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="branch">Branch</label>
                            <select id="branch" name="branch"  >
                                <option value="">{userData.branch}</option>
                                {branches.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="organisation">Company:</label>
                            <input type="text" id="organisation" name="organisation" defaultValue={userData.organisation} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="designation">Designation:</label>
                            <input type="text" id="designation" name="designation" defaultValue={userData.designation} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" defaultValue={userData.email} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone_number">Phone Number:</label>
                            <input type="tel" id="phone_number" name="phone_number" defaultValue={userData.phone_number} />
                            <input type="checkbox" id="phone_visible" checked={checked} onChange={handleChange} name="phone_visible" />
                            <label htmlFor="phone_visible">
                                Make phone number visible
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input type="date" id="dob" name="dob" defaultValue={formatDate(userData.dob)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="linkedin_profile">LinkedIn Profile:</label>
                            <input type="text" id="linkedin_profile" name="linkedin_profile" defaultValue={userData.linkedin_profile} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="instagram_handle">Instagram Profile:</label>
                            <input type="text" id="instagram_handle" name="instagram_handle" defaultValue={userData.instagram_handle} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="twitter_handle">Twitter Profile:</label>
                            <input type="text" id="twitter_handle" name="twitter_handle" defaultValue={userData.twitter_handle} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="facebook_profile">Facebook Profile:</label>
                            <input type="text" id="facebook_profile" name="facebook_profile" defaultValue={userData.facebook_profile} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="hobbies">Hobbies:</label>
                            <input type="text" id="hobbies" name="hobbies" defaultValue={userData.hobbies} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="awards">Achievements:</label>
                            <textarea id="awards" name="awards" defaultValue={userData.awards} placeholder="Any achievements that you want to share.." />
                        </div>
                        <div className="input-group">
                            <label htmlFor="marriage_anniversary">Marriage Anniversary:</label>
                            <input type="date" id="marriage_anniversary" name="marriage_anniversary" defaultValue={formatDate(userData.marriage_anniversary)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="wife_name">Wife:</label>
                            <input type="text" id="wife_name" name="wife_name" defaultValue={userData.wife_name} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="children_name">Children:</label>
                            <input type="text" id="children_name" name="children_name" defaultValue={userData.children_name} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="image">Profile Image:</label>
                            <input type="file" id="image" name="avatar" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="image">Family Image:</label>
                            <input type="file" id="image" name="coverImage" />
                        </div>
                        <button type="submit" className="sign-up-button">Update Profile</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditProfile;
