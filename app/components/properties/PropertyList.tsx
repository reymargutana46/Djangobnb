'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
import apiService from '@/app/services/apiService';

export type PropertyType = {
    id: string;
    title: string;    // Added this line
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchKey = useMemo(() => params.toString(), [params]);

    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = (id: string, is_favorite: boolean) => {
        setProperties((prev) => prev.map((property: PropertyType) => (
            property.id === id
                ? { ...property, is_favorite }
                : property
        )));
    }

    const getProperties = async () => {
        let url = '/api/properties/';

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`;
        } else if (favorites) {
            url += '?favorites=true';
        } else if (searchKey) {
            url += `?${searchKey}`;
        }

        const tmpProperties = await apiService.get(url);
        const favoritesRaw = tmpProperties.favorites ?? tmpProperties.favorite;
        const favoriteIds: string[] = Array.isArray(favoritesRaw) ? favoritesRaw : [];

        setProperties(tmpProperties.data.map((property: PropertyType) => ({
            ...property,
            is_favorite: favoriteIds.includes(property.id),
        })));
    };

    useEffect(() => {
        getProperties();
    }, [landlord_id, favorites, searchKey]);

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default PropertyList;