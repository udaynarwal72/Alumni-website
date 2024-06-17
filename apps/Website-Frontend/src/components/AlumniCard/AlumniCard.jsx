import './AlumniCard.css';

const AlumniCard = ({ AlumniData }) => {
    return (
        <div className='Parent'>
            <div className='card'>
                <div className="card-header">
                    <img src={AlumniData.avatar} className='profile-image' />
                </div>
                <div className='name'>
                    <h1>{AlumniData.first_name} {AlumniData.last_name}</h1>
                </div>
                <div className='details'>
                    <div>
                        Batch
                        <div>{AlumniData.joining_batch}-{Number(AlumniData.joining_batch)+4}</div>
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
