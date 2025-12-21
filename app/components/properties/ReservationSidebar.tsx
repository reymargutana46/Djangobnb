export type Property = {
    id: string;
    price_per_night: number;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    title: string;
    description: string;
    image_url: string;
    landlord: {
        id: string;
        name: string;
        avatar_url?: string;
    };
}

interface ReservationSidebarProps {
    property: Property;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({ 
    property 
}) => {
    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="mb-2 block font-bold text-xs">Guests</label>

                <select className="w-full -ml-1 text-xm">
                    {[...Array(property.guests)].map((_, index) => (
                        <option key={index}>{index + 1}</option>
                    ))}
                </select>
            </div>

            <div className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl">Book</div>

            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * 4 nights</p>

                <p>${property.price_per_night * 4}</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>Djangobnb fee</p>

                <p>${property.price_per_night * 0.05}</p>
            </div>

            <hr />

            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total</p>

                <p>${property.price_per_night * 4 + property.price_per_night * 0.05}</p>
            </div>
        </aside>
    )
};

export default ReservationSidebar;