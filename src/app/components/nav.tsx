'use client'
import { auth } from '@/firebase.js'
import { Box, Button, Typography, TextField } from "@mui/material";

type NavProps = {
    setDisplay: React.Dispatch<React.SetStateAction<number>>,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}
export default function Nav({setDisplay, setSearch} : NavProps) {
    function navToHome() {
        const user = auth.currentUser;
        if(user) {
            setDisplay(1);
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
    function changeFilterState(val:string) {
        if(val === "" || val === null)
            setSearch("");
        else
            setSearch(val);
    }
    return (<div className="flex flex-row justify-between bg-slate-400 p-4 w-full h-[10vh] items-center">
        <Box className=" flex-none w-30 p-x-4">
            <Typography variant="h4" className='text-blue-50' >Inventory Manager</Typography>
        </Box>
        <Box className=" flex-1 px-20">
            <TextField 
            fullWidth 
            placeholder='Search' 
            onChange={(e) => changeFilterState(e.target.value)}>

            </TextField>
        </Box>
        <Box className=" flex-none p-x-4 ">
            <Button className="bg-pink-400 rounded-md mr-4" onClick={logout}>Logout</Button>
            <Button className="bg-pink-400 rounded-md" onClick={navToHome}>Home</Button>
        </Box>
    </div>);
}