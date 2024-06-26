import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';
import Footer from '../../components/footer';
import "../../styles/Completeprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import dataCountry from '../../../../../src/countries.json';
import dataState from '../../../../../src/states.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const branches = [
	'Computer Science', 'Electronics and Communication Engineering', 'Information Technology',
	'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Production and Industrial Engineering',
	'Mathematics and Computing', 'Industrial Internet of Things', 'MBA', 'MCA', 'Ph.D', 'Other'
];
const Completeprofile = () => {
	const navigate = useNavigate();
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedState, setSelectedState] = useState('');
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [fetchedCountries, setFetchedCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

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
			const fetchCities = async () => {
				const selectedCountryIso2 = selectedCountry.split('+')[2];
				const selectedStateIso2 = selectedState.split('+')[2];

				try {
					setIsLoading(true);
					const response = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryIso2}/states/${selectedStateIso2}/cities`, {
						method: 'GET',
						headers: { "X-CSCAPI-KEY": "UEFXY210QzFpUzlLdlpUTUlBelNrNjVNcUJwS2xYSjUzMGlMY3UxTg==" },
						redirect: 'follow'
					});
					const result = await response.json();
					setCities(result.map(city => city.name));
				} catch (error) {
					setError('Failed to fetch cities');
				} finally {
					setIsLoading(false);
				}
			};

			fetchCities();
		} else {
			setCities([]);
		}
	}, [selectedState]);

	const addField = () => {
		document.querySelector('.new-fields').style.display = 'block';
	};

	const submitExtraInformation = async (event) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		// Convert FormData to JSON object
		const jsonObject = {};
		formData.forEach((value, key) => {
			jsonObject[key] = value;
		});

		try {
			const response = await axios.put(`http://localhost:3000/api/v1/user/updateprofile/${localStorage.getItem('user_id')}`, jsonObject, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json'
				},
			});
			console.log(response.data); // Access response data if needed
			fireToast("Profile Updated successfully");
		} catch (error) {
			console.error('Failed to submit extra information', error);
		}
	};

	const fireToast = (toastData) => {
		toast(toastData, {
			onClose: () => navigate(`/user/${localStorage.getItem('user_id')}`)
		});
	};
	return (
		<>
			<NavBar />
			<div className="parent-comp-prof">
				<div className="form-struct">
					<form className="complete-prof" method="POST" onSubmit={submitExtraInformation}>
						<div className="header-row">
							<h1>Additional Details</h1>
						</div>
						<div className="comp-form-section">
							<div>
								<label>Country:</label>
								<select className='in' name="current_country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
									<option value="">Select Country</option>
									{fetchedCountries.map(country => (
										<option key={country} value={country}>{country.split('+')[0]}</option>
									))}
								</select>
							</div>
							<div>
								<label>State:</label>
								<select className='in' name="current_state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} >
									<option value="">Select State</option>
									{states.map(state => (
										<option key={state} value={state}>{state.split('+')[0]}</option>
									))}
								</select>
							</div>
							<div>
								<label>City:</label>
								<select className='in' name="current_city">
									<option value="">Select City</option>
									{cities.map(city => (
										<option key={city} value={city}>{city}</option>
									))}
								</select>
							</div>
						</div>
						<div className="comp-form-section">
							<div>
								<label>LinkedIn Profile:</label>
								<input type="text" name="linkedin" className="in" />
							</div>
							<div>
								<label>Instagram Profile:</label>
								<input type="text" name="instagram" className="in" />
							</div>
							<div>
								<label>Twitter Profile:</label>
								<input type="text" name="twitter" className="in" />
							</div>
						</div>
						<div className="form-section">
							<div>
								<label>Achievements:</label>
								<textarea name="achievements" placeholder="Any achievements that you want to share.." />
							</div>
							<div>
								<label>Hobbies:</label>
								<div>
									<input type="text" className="in" name="hobbies" placeholder='e.g., Reading Books, Listening to Music, etc..' />
								</div>
							</div>
						</div>
						<div className="plus">
							<div>
								<button
									className="icon-button"
									type="button"
									onClick={addField}
								>
									<FontAwesomeIcon icon={faPlus} />
								</button>
							</div>
						</div>
						<div className="new-fields" style={{ display: 'none' }}>
							<div>
								<label>Field Name:</label>
								<input
									type="text"
									name="heading"
									className="in"
								/>
							</div>
							<div>
								<label>Description:</label>
								<textarea
									name="description"
								/>
							</div>
						</div>
						<div className="cen">
							<div>
								<button type="submit" className="prof-subm">
									Submit
								</button>
							</div>
						</div>
					</form>
					{isLoading && <p>Loading...</p>}
					{error && <p className="error">{error}</p>}
				</div>
			</div>
			<ToastContainer />
			<Footer />
		</>
	);
};

export default Completeprofile;