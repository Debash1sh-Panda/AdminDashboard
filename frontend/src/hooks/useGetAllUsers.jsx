import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllUser } from "../redux/userSlice.js";
import { BASE_URL_API_USER } from "../utils/baseUrl.js";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL_API_USER}/get-all-users`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllUser(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
