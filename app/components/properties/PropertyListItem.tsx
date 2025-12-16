import Image from "next/image";
import Link from "next/link";
import { PropertyType } from "./PropertyList";

interface PropertyProps {
    property: PropertyType
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property
}) => {
    return (
        <Link href={`/properties/${property.id}`} className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach House"
                    unoptimized
                />
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
            </div>
        </Link>
    )
}

export default PropertyListItem;