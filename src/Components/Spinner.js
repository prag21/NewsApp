import React from 'react'
import loading from './loading.gif'

const Spinner=()=> {

    return (
      <div className='text-center'>
          <img src={loading} alt="Loading"></img>
      </div>
    )
  }
export default Spinner