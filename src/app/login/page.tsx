import { redirect } from "next/navigation";
import Form from "./form"
import { getServerSession } from "next-auth"

const Login = async () => {
    const session = await getServerSession();
    if (session?.user) {
        redirect('/profile')
    }

  return (
    <div className="bg-slate-50 dark:bg-black">
        <Form />
    </div>
  )
}

export default Login