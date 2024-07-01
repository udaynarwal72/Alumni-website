const TestimonialsCard = ({data}) => {
    console.log("testimonials",data)
    return (
        <div className="mb-8 flex justify-center items-evenly" >
            <div className="rounded-lg w-4/5 overflow-scroll h-80 bg-white shadow-md p-6 mx-auto">
                <p className="text-gray-700 font-dmsans text-center leading-relaxed">
                    {data.body}
                </p>
                <div className="mt-4">
                    <p className="text-center text-gray-700 font-dmsans font-semibold">~ {data.createdBy.username}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsCard;
