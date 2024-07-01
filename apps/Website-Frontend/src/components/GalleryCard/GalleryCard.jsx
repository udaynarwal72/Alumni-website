const GalleryCard = ({ data }) => {
    return (
        <div className="gallery-card">
            <div className="gallery-card__image  rounded-full m-5">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{
                    width: '30.625em',
                    height: '30.625em',
                    objectFit: 'cover',
                    borderRadius: '50%',
                }} alt="gallery" />
            </div>
        </div>
    );
}


export default GalleryCard;