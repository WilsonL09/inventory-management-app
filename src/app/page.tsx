'use client'
import Nav from '@/app/components/nav'
import Main from '@/app/components/main'
import Login from '@/app/components/login'
import { useEffect, useState } from "react";
import { auth } from '@/firebase.js';

export default function Home() {
    // 0 -> login page
    // 1 -> home page
    const [display, setDisplay] = useState(0);

    return ( <div className='w-full h-full bg-pink-300'>
        <Nav setDisplay={setDisplay} />
        {display === 0 && <Login setDisplay={setDisplay}/>}
        {display === 1 && <Main />}
    </div>
    );
}
