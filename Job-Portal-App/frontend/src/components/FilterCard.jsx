import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setFilter } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analyst", "Product Designer", "Graphic Designer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh", "5lakh to 10lakh", "10lakh+"]
    },
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        Salary: ""
    });
    const dispatch = useDispatch();

    const changeHandler = (value, type) => {
        const newFilters = { ...selectedFilters, [type]: value };
        setSelectedFilters(newFilters);
        dispatch(setFilter(newFilters));
    }

    useEffect(() => {
        dispatch(setFilter(selectedFilters));
    }, []);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={index} className='mb-4'>
                        <h1 className='font-bold text-lg mb-2'>{data.filterType}</h1>
                        <RadioGroup
                            value={selectedFilters[data.filterType]}
                            onValueChange={(value) => changeHandler(value, data.filterType)}
                        >
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard