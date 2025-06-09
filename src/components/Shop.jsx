import React, { useEffect, useRef } from 'react'
import Home2 from './Home/Home2'
import Home3 from './Home/Home3'
import Home4 from './Home/Home4'
import Home5 from './Home/Home5'
import Home6 from './Home/Home6'
import Home7 from './Home/Home7'

function Shop() {
    const topRef = useRef(null);
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <div className='mt-20 md:mt-35'>
            <Home2 />
            <Home3 />
            <Home4 />
            <Home5 />
            <Home6 />
            <Home7 />
        </div>
    )
}

export default Shop