'use client'
import Nav from '@/app/components/nav'
import Main from '@/app/components/main'
import Login from '@/app/components/login'
import { useState } from "react";

export default function Home() {
    // 0 -> login page
    // 1 -> home page
    const [display, setDisplay] = useState(0);
    const [search, setSearch] = useState<string>("");
    return ( <div className='w-full h-full bg-pink-300'>
        <Nav display={display} setDisplay={setDisplay} setSearch={setSearch} />
        {display === 0 && <Login setDisplay={setDisplay}/>}
        {display === 1 && <Main search={search}/>}
    </div>
    );
}
