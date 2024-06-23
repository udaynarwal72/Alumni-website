import React, { useState } from 'react';
import NavBar from '../../components/Navbar'; // Fixed case sensitivity
import Footer from '../../components/footer'; // Fixed case sensitivity
import '../../styles/PostEvent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Fixed import from 'react-router-dom'

const PostEvent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [eventId, setEventId] = useState('');

  const createEvent = async (e) => {
    e.preventDefault();

    // Collect form data
    const event_title = document.getElementById('event_title').value;
    const event_date = document.querySelector('.event-date').value;
    const event_start_time = document.querySelector('input[name="start_time"]').value;
    const event_end_time = document.querySelector('input[name="end_time"]').value;
    const event_venue = document.getElementById('event_venue').value;
    const event_organizer = document.getElementById('event_organizer').value;
    const event_body = document.getElementById('event_body').value;
    const venue_address = document.getElementById('venue_address').value;
    const venue_map_link = document.getElementById('venue_map_link').value;
    const event_hashtags = document.getElementById('event_hashtags').value;
    const live_stream_link = document.getElementById('live_stream_link').value;
    const confirm_appearance_deadline = document.getElementById('confirm_appearance_deadline').value;

    // Create event object
    const event = {
      event_title,
      event_date,
      event_start_time,
      event_end_time,
      event_venue,
      event_organizer,
      event_body,
      venue_address,
      venue_map_link,
      event_hashtags,
      live_stream_link,
      confirm_appearance_deadline,
    };

    try {
      // Send POST request to the server
      const response = await fetch('http://localhost:3000/api/v1/event/postevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(event),
      });

      // Check if response is not ok
      if (!response.ok) {
        throw new Error('Failed to post event');
      }

      // Get response data
      const data = await response.json();
      setEventId(data.data._id);

      // Notify user and navigate to event page
      fireToast("Event Posted Successfully", data.data._id);
    } catch (error) {
      // Handle error
      console.error('Error posting event:', error);
      setErrorMessage('Failed to post event. Please try again later.');
    }
  };

  const fireToast = (toastData, eventId) => {
    toast(toastData, {
      onClose: () => navigate(`/eventpage/${eventId}`)
    });
  };

  return (
    <>
      <NavBar />
      <div className="parent-event-form">
        <div className="blog-form-container">
          <form className="event-form" onSubmit={createEvent}>
            <h1>Create Event</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="event-row">
              <label htmlFor="event_title">Event Name:</label>
              <input type="text" id="event_title" name="event_title" className="demo" required />
            </div>
            <div className="event-row2">
              <div className="event-col">
                <label>Date:</label>
                <input type="date" className="event-date" name="event_date" required />
              </div>
              <div className="event-col">
                <label>Start Time:</label>
                <input type="time" className="event-time" name="start_time" required />
              </div>
              <div className="event-col">
                <label>Ending Time:</label>
                <input type="time" className="event-time" name="end_time" required />
              </div>
            </div>
            <div className="event-row">
              <label htmlFor="event_venue">Venue:</label>
              <input type="text" id="event_venue" name="event_venue" className="demo" required />
            </div>
            <div className="event-row">
              <label htmlFor="venue_address">Venue Address:</label>
              <input type="text" id="venue_address" name="venue_address" className="demo" required />
            </div>
            <div className="event-row">
              <label htmlFor="venue_map_link">Venue Map Link:</label>
              <input type="text" id="venue_map_link" name="venue_map_link" className="demo" required />
            </div>
            <div className="event-row">
              <label htmlFor="event_organizer">Organizer:</label>
              <input type="text" id="event_organizer" name="event_organizer" className="demo" required />
            </div>
            <div className="event-row">
              <label htmlFor="event_hashtags">Hashtags:</label>
              <input type="text" id="event_hashtags" className="demo" name="event_hashtags" placeholder="e.g. #letshavefun #alumni #meetup" />
            </div>
            <div className="event-row">
              <label htmlFor="live_stream_link">Live Stream Link:</label>
              <input type="text" id="live_stream_link" className="demo" name="live_stream_link" />
            </div>
            <div className="event-row">
              <label htmlFor="confirm_appearance_deadline">Deadline for Confirming Appearance:</label>
              <input type="date" id="confirm_appearance_deadline" className="demo" name="confirm_appearance_deadline" />
            </div>
            <div className="event-row">
              <label htmlFor="event_body">Event Description:</label>
              <textarea id="event_body" name="event_body" rows="10" required />
            </div>
            <button type="submit" className="blog-form-button">Post</button>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default PostEvent;
