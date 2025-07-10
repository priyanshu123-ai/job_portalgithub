import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// adjust path as per your project
 
import { COMPANY_API_END_POINT } from "@/components/utils/constant";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
