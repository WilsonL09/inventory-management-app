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
        } else {
            alert("signin first!");
        }
    }
    return (<div className="flex flex-row justify-between bg-slate-400 p-4 w-full h-[10vh] items-center">
        <div className="flex-none w-30 p-x-4">
            <Typography variant="body1" >Inventory Manager</Typography>
        </div>
        
        <div className="flex-none p-x-4 ">
            <Button className="bg-pink-400 rounded-md mr-4">User</Button>
            <Button className="bg-pink-400 rounded-md" onClick={navToHome}>Home</Button>
        </div>
    </div>);
}