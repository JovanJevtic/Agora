import { serialize } from 'next-mdx-remote/serialize';
import WriteForm from './form'

const CreatePost = () => {
  return (

    <div className="container pt-3">
        <h1 className="font-bold mb-5">Dobrodošao pišče kreiranju nove objave</h1>
        <WriteForm />
    </div>
  )
}

export default CreatePost