import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { login } from "./auth";
import {useRouter} from "next/router"


const schema = yup.object({
  username: yup.string().required("نام کاربری"),
  password: yup.string().required("رمز عبور"),
});
function Login() {
  const router= useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    const result = await login(data);
    localStorage.setItem("token", result.token  )
    router.push("/products")
  };
 
  return (
    <div>
      <h1>فرم ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="نام کاربری" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
        <input type="password" placeholder="رمز" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">ورود</button>
        <Link href="/register">ایجاد حساب کاربری</Link>
      </form>
    </div>
  );
}

export default Login;
