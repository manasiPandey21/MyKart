import React from 'react'

const EmptyPage = () => {
    return (
        <div className='container m-5 h-50 w-25 align-self-center '>
            <h1 className='m-5 pt-5 fw-normal'>Oops! your cart looks light :(</h1>
            <img src="empty.jpg" className="rounded h-30 w-100 m-5" alt="..." />
        </div>
    )
}

export default EmptyPage;
