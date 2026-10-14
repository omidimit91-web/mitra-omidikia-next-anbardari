import api from "./axios";
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
export const register =async(data)=>{
  const resp = await api.post("auth/register",data)
  return resp.data
}