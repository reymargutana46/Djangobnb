'use client';

import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';
import React from 'react';

export type SelectCountryValue = {
    label: string;
    value: string;

}

interface SelectCountryProps {
    value?: SelectCountryValue;
    onchange: (value: SelectCountryValue) => void;


}

const SelectCountry: React.FC<SelectCountryProps> =({
    value,
    onchange

}) => {
    const {getAll} = useCountries();

    return (
        <>
            <Select
                isClearable
                placeholder="Anywhere"
                options={getAll()}
                value={value}
                onChange={(value) =>onchange(value as SelectCountryValue)}
            />
        </>
    )

}

export default SelectCountry;