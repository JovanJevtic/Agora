import Spinner from "./components/Spinner/Spinner"

const loading = () => {
  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>
        <Spinner />
    </div>
  )
}

export default loading  