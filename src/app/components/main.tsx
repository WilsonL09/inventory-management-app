'use client'
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, Modal, TextField} from '@mui/material';
import { auth, db } from '../../firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { parseName, type Inventory } from '../../helper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

type MainPageProps = {
    search: string
}
export default function Main( {search}: MainPageProps) {
  const collectName = "items+" + auth.currentUser?.email;
  //state
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>('');
  //fetch inventory data from firestore
  const updateInventory = async () => {
    const snapshot = query(collection(db, collectName));
    const docs = await getDocs(snapshot);
    const inventoryList: Inventory[] = [];
    docs.forEach((doc) => inventoryList.push({name: doc.data().name, quantity: doc.data().quantity}));
    setInventory(inventoryList);
};
useEffect(()=>{updateInventory()},[]);
//add item
async function addItem(itemName:string) {
    itemName = parseName(itemName);
  if(itemName === "") {
    alert("Please enter a valid name");
    return;
  }
  const docRef = doc(collection(db, collectName), itemName);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, {name: itemName, quantity: quantity+1 });
  } else {
      await setDoc(docRef, {name: itemName, quantity: 1})
  }
  await updateInventory();
}
//remove item
const removeItem = async (itemName: string) => {
  const docRef = doc(collection(db, collectName), itemName);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
      const { quantity } = docSnap.data();
      if(quantity === 1) {
          await deleteDoc(docRef);
      } else {
          await setDoc(docRef, {name: itemName, quantity: quantity-1});
      }
  }
  await updateInventory();
}
//control modal state
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
return (
  <Box className="w-screen h-[90vh] flex justify-center flex-col items-center gap-2">
      <Modal 
      open={open} 
      onClose={handleClose} aria-labelledby="modal-modal-description"
      aria-describedby="modal-modal-description">
          <Box sx={style}>
              <Typography 
              id="modal-modal-title" 
              variant="h6"
              component="h4">
                  Add Item
              </Typography>
              <Stack width="100%" direction={'row'}>
                  <TextField 
                  id="outlined-basic"
                  label="Item"
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e)=> setItemName(e.target.value)} />

                  <Button 
                  variant="outlined"
                  onClick={()=>{
                      addItem(itemName);
                      setItemName('');
                      handleClose();
                  }}>
                      Add
                  </Button>

              </Stack>
          </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen} className="mt-4 mb-2 self-end mr-[4%]">
          Add New Item
      </Button>
        {/* Main Box for the list*/}
      <Box className="w-[92%] h-[80%] overflow-x-clip overflow-y-scroll rounded-md" border={'1px solid #111'}>
          <Box className=" w-200 h-25 bg-[#ADD8E6] flex justify-center items-center">
              <Typography variant={'h4'} className="text-center underline">
                  Inventory Items
              </Typography><br/>
          </Box>
          <Box className=" w-200 h-25 bg-[#ADD8E6] flex px-5 items-center">
              <Typography variant={'h5'} className="flex-1 underline">
                  Item
              </Typography><br/>
              <Typography variant={'h5'} className="flex-1 underline">
                  Quantity
              </Typography><br/>
              <Typography variant={'h5'} className="underline">
                  Removal
              </Typography><br/>
          </Box>
          <Stack className=" w-200 h-75 max-h-5/6 overflow-auto" spacing={2}>
              {inventory.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).map(({name, quantity}) => (
                  <Box
                  key={name}
                  className="w-full min-h-20 flex justify-between items-center bg-[#f0f0f0] px-5">
                      <Typography variant={'h5'} className="flex-1">
                          {parseName(name)}
                      </Typography>
                      <Typography variant={'h5'} className="flex-1">
                          {quantity}
                      </Typography>
                      <Button variant="contained"  onClick={() => removeItem(name)}>
                          Remove
                      </Button>
                  </Box>
              ))}
          </Stack>
      </Box>
  </Box>
);
}