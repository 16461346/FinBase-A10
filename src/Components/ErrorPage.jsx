import React from 'react';
import Error from '../assets/error-404.png'

const ErrorPage = () => {
    return (
        <div className='container mx-auto my-20 flex justify-center items-center'>
            <img src={Error} alt="" />
        </div>
    );
};

export default ErrorPage;