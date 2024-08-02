'use client'

import { Button, Typography } from "@mui/material";

export default function Nav() {

    return (<div className="flex flex-row justify-between bg-slate-400 p-4 w-full h-[10vh] items-center">
        <div className="flex-none w-30 p-x-4">
            <Typography variant="body1" >Inventory Manager</Typography>
        </div>
        
        <div className="flex-none p-x-4 ">
            <Button className="bg-pink-400 rounded-md mr-4">User</Button>
            <Button className="bg-pink-400 rounded-md">Home</Button>
        </div>
    </div>);
}