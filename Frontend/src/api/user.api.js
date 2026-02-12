import { setUserData } from "../redux/UserSlice";
import axios from "./axios";

const getCurrentUser= async(dispatch)=>{
  try {
    const result = await axios.get("/user/current-user");
    dispatch(setUserData(result.data.data.user));
    // console.log('user data' , result.data.data.user);
  } catch (error) {
    console.log(error);
  }
}

export{
  getCurrentUser,
}