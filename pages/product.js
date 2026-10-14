import api from "./axios"
export const getProducts = async (page ,limit,name)=>{
  const response = await api.get("/products" ,{params:{page,limit ,name}})
  return response.data
}
export const creatProduct=async(data)=>{
  const resp=await api.post("/products",data)
  return resp.data
}
export const deleteProduct=async(id)=>{
  await api.delete(`/products/${id}`)
}