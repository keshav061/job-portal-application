import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, filter } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                let query = `keyword=${searchedQuery}`;
                if (filter) {
                    if (filter.Location) query += `&location=${filter.Location}`;
                    if (filter.Industry) query += `&industry=${filter.Industry}`;
                    if (filter.Salary) query += `&salary=${filter.Salary}`;
                }
                const res = await axios.get(`${JOB_API_END_POINT}/get?${query}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs