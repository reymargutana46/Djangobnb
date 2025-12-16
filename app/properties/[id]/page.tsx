import { getProperty } from "@/app/lib/actions";
import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={property.image_url}
          className="object-cover w-full h-full"
          alt={property.title}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{property.title}</h1>

          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathroom
          </span>

          <hr />

          <div className="py-6 flex items-center space-x-4">
            <Image
              src={property.landlord.avatar_url || "/profile_pic_1.jpg"}
              width={50}
              height={50}
              className="rounded-full"
              alt={property.landlord.name}
            />

            <p><strong>{property.landlord.name}</strong> is your host</p>
          </div>

          <hr />

          <p className="mt-6 text-lg">
            {property.description}
          </p>
        </div>

        <ReservationSidebar property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;