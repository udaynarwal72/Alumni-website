import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import "../styles/EventInfo.css";

const EventInfo=()=>{
    return(
        <>
        <NavBar />
        <div className='parent-event-info'>
        <div class="event-container">
    <div class="event-poster">
        <img src="https://via.placeholder.com/150" alt="Event Poster"></img>
    </div>
    <div class="event-page-title">
        <h1>Event Title Here</h1>
    </div>
    <div class="event-details">
        <p><strong>Date:</strong> June 25, 2024</p>
        <p><strong>Time:</strong> 7:00 PM - 10:00 PM</p>
        <p><strong>Venue:</strong> ABC Auditorium, City</p>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula quam vel felis euismod, non fermentum nunc consectetur.</p>
    </div>
</div>
        </div>
        <Footer />
        </>
    )
}

export default EventInfo;