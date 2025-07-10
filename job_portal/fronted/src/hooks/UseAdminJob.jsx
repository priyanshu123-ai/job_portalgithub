import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '../components/utils/constant';

const useAdminJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        console.log("Fetching admin jobs...");
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log("✅ Admin Jobs:", res.data.jobs);
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.warn("❌ Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error('❌ Error in useAdminJob:', error.message);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useAdminJob;
