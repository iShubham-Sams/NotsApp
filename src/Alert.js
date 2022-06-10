import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert,List}) => {
  useEffect(()=>{
  const tiemout=setTimeout(() => {
    removeAlert()
  }, 3000);
  return ()=>clearTimeout(tiemout)
  },[List])
  return (
    <>
      <p className={`alert alert-${type}`}>{msg}</p>
    </>
  )
}

export default Alert
