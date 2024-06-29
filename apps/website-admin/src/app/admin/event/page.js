"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Home component to display the events' data
export default function Home() {
    const [eventData, setEventData] = useState([]);

    const fetchEventData = async () => {
        console.log('Fetching data from API...');
        try {
            const response = await axios.get('http://localhost:3000/api/v1/event/getallevents');
            const allEvents = response.data.data;
            setEventData(allEvents);
            console.log('Data fetched:', allEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to remove an event by ID
    const removeEvent = (id) => {
        console.log('Removing event with id:', id);
        axios.delete(`http://localhost:3000/api/v1/admin/deleteevent/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log('Event removed:', res.data);
            fetchEventData(); // Refresh data after deletion
        })
        .catch(error => {
            console.error('Error removing event:', error);
        });
    };

    // Confirmation dialog for event removal
    const handleRemoveClick = (id) => {
        const confirmation = window.confirm('Are you sure you want to remove this event?');
        if (confirmation) {
            removeEvent(id);
        }
    };

    // Render action button based on removing state
    const renderActionButton = (event) => {
        if (event.isRemoving) {
            return (
                <button className='btn btn-primary' disabled>Removing...</button>
            );
        } else {
            return (
                <button className='btn btn-danger' onClick={() => handleRemoveClick(event._id)}>Remove</button>
            );
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchEventData();
    }, []);

    return (
        <main className='overflow-scroll flex-1 align-center justify-center'>
            <table className="table m-5 w-auto">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Start time</th>
                        <th scope="col">Link</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {eventData.map((event, index) => (
                        <tr key={event._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{event.event_title}</td>
                            <td>{event.event_body}</td>
                            <td>{event.start_time}</td>
                            <td>{event.live_stream_link}</td>
                            <td>{renderActionButton(event)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
