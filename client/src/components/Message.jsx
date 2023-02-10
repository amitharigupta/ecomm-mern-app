import React from 'react'
import Toast from "react-hot-toast";

const Message = ({ children }) => {
  return (
    Toast.error(children)
  )
}

export default Message