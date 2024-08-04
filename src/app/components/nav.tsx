'use client'
import { auth } from '@/firebase.js'
import { Button, Typography } from "@mui/material";

type NavProps = {
    setDisplay: React.Dispatch<React.SetStateAction<number>>;
}
export default function Nav({setDisplay} : NavProps) {
    function navToHome() {
        const user = auth.currentUser;
        if(user) {
            setDisplay(1);
            console.log(user);
        } else {
            alert("signin first!");
        }
    }
    async function logout() {
        if(auth.currentUser) {
            await auth.signOut();
            setDisplay(0);
            alert("You have logged out!")
        } else {
            alert("You are not signed in");
        }
    }
    return (<div className="flex flex-row justify-between bg-slate-400 p-4 w-full h-[10vh] items-center">
        <div className="flex-none w-30 p-x-4">
            <Typography variant="h4" className='text-blue-50' >Inventory Manager</Typography>
        </div>
        
        <div className="flex-none p-x-4 ">
            <Button className="bg-pink-400 rounded-md mr-4" onClick={logout}>Logout</Button>
            <Button className="bg-pink-400 rounded-md" onClick={navToHome}>Home</Button>
        </div>
    </div>);
}