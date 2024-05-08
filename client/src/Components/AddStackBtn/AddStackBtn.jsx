import React from 'react'
import './AddStackBtn.css'

export default function AddStackBtn({ onClick }) {
  return (
    <div className='addStackBtn' onClick={onClick}>
      + New Stack
    </div>
  )
}
