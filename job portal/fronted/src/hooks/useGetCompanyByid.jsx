import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// adjust path as per your project
 
import { COMPANY_API_END_POINT } from "@/components/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyByid = (companyId) => {
  const dispatch = useDispatch();

  useEffect((companyId) => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchSingleJob();
  }, [companyId,dispatch]);
};

export default useGetCompanyByid;
