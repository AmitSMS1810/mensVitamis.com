import React, { useEffect, useRef } from 'react'
import Card1 from './cardComponents/Card1'
import Card2 from './cardComponents/Card2'
import Card3 from './cardComponents/Card3'
function Card() {
    const topRef = useRef(null);
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <div ref={topRef}>
            <Card1 />
            <Card2 />
            <Card3 />
        </div>
    )
}

export default Card