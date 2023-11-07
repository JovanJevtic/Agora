import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


const Spinner = () => {
  return (
    <ClipLoader
        color={'yellow'}
        loading={true}
        // cssOverride={override}
        // size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Spinner