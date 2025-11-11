import React from 'react';
import notfound from '../assets/App-Error.png'

const NotFound = () => {
    return (
        <div className='container flex justify-center'>
            <img src={notfound} alt="" />
        </div>
    );
};

export default NotFound;