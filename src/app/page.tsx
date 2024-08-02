'use client'
import Nav from '@/app/components/nav'
import Main from '@/app/components/main'
import Login from '@/app/components/login'
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home() {
    // 0 -> login page
    // 1 -> home page
    const [display, setDesplay] = useState(0);
    return ( <div className='w-full h-full bg-pink-300'>
        <Nav />
        {display === 0 && <Login />}
        {display === 1 && <Main />}
    </div>
    );
}
