'use client';

import { useEffect, useState } from 'react';
import PropertyListItem from "./PropertyListItem";
import apiService from '@/app/services/apiService';

export type PropertyType = {
    id: string;
    price_per_night: number;
    guests: number;  // Added this line
    bedrooms: number; // Added this line
    bathrooms: number; // Added this line
    title: string;    // Added this line
    description: string; // Added this line
    image_url: string;  // Added this line
    landlord: {         // Added this line
        id: string;     // Added this line
        name: string;   // Added this line
        avatar_url?: string; // Added this line
    }; 
}

const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);

    const getProperties = async () => {
        const tmpProperties = await apiService.get('/api/properties/')

        setProperties(tmpProperties.data);
    };

    useEffect(() => {
        getProperties();
    }, []);

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                    />
                )
            })}
        </>
    )
}

export default PropertyList;