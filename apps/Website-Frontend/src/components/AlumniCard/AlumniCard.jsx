import './AlumniCard.css';

const AlumniCard = ({ alumnus }) => {
    console.log('hi',alumnus)
    return (
        <div className='Parent'>
            <div className='card'>
                <div className="card-header">
                    <img src={profileImage || "https://via.placeholder.com/150"} alt={`${name}'s profile`} className='profile-image' />
                </div>
                <div className='name'>
                    <h1>{username}</h1>
                </div>
                <div className='details'>
                    <div>
                        Batch
                        <div>{batch}</div>
                    </div>
                    <div>
                        Designation
                        <div>{designation}</div>
                    </div>
                    <div>
                        Company
                        <div>{company}</div>
                    </div>
                    <div>
                        Location
                        <div>{location}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniCard;
