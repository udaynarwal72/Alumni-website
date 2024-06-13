import './AlumniCard.css';

const AlumniCard = () => {
    return (
        
        <div className='Parent'>
            <div className='card'>
                <div className="card-header">
                    <img src="https://via.placeholder.com/150" className='profile-image'></img>
                </div>
                <div className='name'>
                    <h1>Pragati Bhargwan</h1>
                </div>
                
                <div className='details'>
                    <div>Batch
                        <div>1998-92</div>
                    </div>
                    <div>Designation
                        <div >Associate Manager</div>
                    </div>
                    <div>Comapany
                        <div>Zomato</div>
                    </div>
                    <div>Location
                        <div>Bengaluru</div>
                    </div>
                
                </div>
                
                
            </div>
        </div>
    );
};

export default AlumniCard;