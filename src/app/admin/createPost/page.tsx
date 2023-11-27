import { serialize } from 'next-mdx-remote/serialize';
import WriteForm from './form'

export const transformMd = async (body: string) => {
  const res = await serialize(body, { mdxOptions: { development: process.env.NODE_ENV === "development" } })
  return res;
  // setMdPreview(res)
}

const CreatePost = () => {
  return (

    <div className="container pt-3">
        <h1 className="font-bold mb-5">Dobrodošao pišče kreiranju nove objave</h1>
        <WriteForm />
    </div>
  )
}

export default CreatePost