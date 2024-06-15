import './AlumniCard.css';

const AlumniCard = () => {
    return (
        <div className='Parent'>
            <div className='card'>
                <div className="card-header">
                    <img src="https://via.placeholder.com/150" className='profile-image' />
                </div>
                <div className='name'>
                    <h1>Pragati Bhargawan</h1>
                </div>
                <div className='details'>
                    <div>
                        Batch
                        <div>1998-02</div>
                    </div>
                    <div>
                        Designation
                        <div>Associate Manager</div>
                    </div>
                    <div>
                        Company
                        <div>Zomato</div>
                    </div>
                    <div>
                        Location
                        <div>Bengaluru</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniCard;
