const PostJob = () => {
    const createJob = () => {
        console.log("This is createJob")
    }
    return (
        <>
            <NavBar />
            <div className="parent-event-form">
                <div className="blog-form-container">
                    <form onSubmit={createJob} className="event-form">
                        <h1>Create Event</h1>
                        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
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
                            <input type="text" id="event_hashtags" className='demo' name="event_hashtags" placeholder="e.g. #letshavefun #alumni #meetup" />
                        </div>
                        <div className="event-row">
                            <label htmlFor="live_stream_link">Live Stream Link:</label>
                            <input type="text" id="live_stream_link" className='demo' name="live_stream_link" />
                        </div>
                        <div className="event-row">
                            <label htmlFor="confirm_apperance_deadline">Deadline for Confirming Appearance:</label>
                            <input type="date" id="confirm_apperance_deadline" className='demo' name="confirm_apperance_deadline" />
                        </div>
                        <div className="event-row">
                            <label htmlFor="event_body">Event Description:</label>
                            <textarea id="event_body" name="event_body" rows="10" required />
                        </div>
                        <button type="submit" className="blog-form-button">Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PostJob;