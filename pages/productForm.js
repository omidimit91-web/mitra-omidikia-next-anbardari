import {useForm} from "react-hook-form"
import { creatProduct } from "./product"

function ProductForm() {
  const {register,
    handleSubmit,
  }= useForm()
  const onSubmit=async(data)=>{
    const result =await creatProduct(data)
    return result

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="نام محصول راوارد کنید" {...register("name")}/>
      <input type="number" placeholder="قیمت محصول را وارد کنید"{...register("price")}/>
      <input type="number" placeholder="تعداد را وارد کنید"{...register("quantity")}/>
      <button type="submit" >ایجاد محصول جدید+</button>
    </form>
  )
}

export default ProductForm