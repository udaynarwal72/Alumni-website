const TestimonialsCard = () => {
    return (
        <div className="mb-8 flex justify-center">
            <div className="rounded-lg bg-white shadow-md p-6 max-w-xs mx-auto">
                <div className="flex items-center justify-center mb-4">
                    <img
                        alt="Paul Starr"
                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                </div>
                <p className="text-gray-700 text-center leading-relaxed">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur
                    recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque
                    voluptates magnam!
                </p>
                <div className="mt-4">
                    <p className="text-center text-gray-700 font-semibold">~ Paul Starr</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsCard;
