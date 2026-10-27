import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import Job from './Job';

const SavedJobs = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/saved`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSavedJobs();
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <h1 className='font-bold text-xl my-5'>Saved Jobs</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
                    {
                        savedJobs.length <= 0 ? <span>No saved jobs found.</span> : (
                            savedJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SavedJobs
