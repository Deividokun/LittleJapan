import React from 'react'
import './ownerCard.css'

function OwnerCard({
  imageUser,
  userName,
  experienciaUser,
  valorationUser,
  telephoneUser
}) {
  return (
    <article className='ownerCard'>
      <div className='owner-header'>
        <img src={imageUser} alt='owner' />
        <h3>{userName}</h3>
      </div>
      <div className='owner-info'>
        <p className='dates'>
          <strong>Experience:</strong> {experienciaUser} years
        </p>
        <p className='rating dates'>
          <strong>Rating:</strong> {valorationUser} ★
        </p>
        <p className='dates'>
          <strong>Telephone:</strong> {telephoneUser}
        </p>
      </div>
    </article>
  )
}

export default OwnerCard
