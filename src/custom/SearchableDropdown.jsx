import React from 'react';
import Select from 'react-select';
import { formStatusData } from '../data/formStatusData';

// Transform formStatusData to match the structure expected by react-select
const options = formStatusData.map(status => ({
    value: status.value,
    label: status.label
}));

const SearchableDropdown = ({ setFieldValue, initialStatus, isMode }) => {

    const handleChange = (selectedOption) => {
        setFieldValue("status", selectedOption.value); // Update Formik field
    };

    console.log(initialStatus)

    return (
        <Select
            options={options}
            className='text-black text-left placeholder:text-center z-0'
            onChange={handleChange}
            placeholder="Select a status"
            isSearchable={true}
            defaultInputValue={isMode === "edit" ? initialStatus : ""}
        />
    );
};

export default SearchableDropdown;
