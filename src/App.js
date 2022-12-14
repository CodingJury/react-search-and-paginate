import { useEffect } from "react";
import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { dummyData } from "./dummy_data";

import {
  Button,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddData, replaceToNewUsers} from "./reduxFolder/userSlice";

import FilterHeader from "./components/FilterHeader";
import { ConstructionOutlined } from "@mui/icons-material";

function App() {
  const usersArray = useSelector((state) => state.user.usersArray);
  const dispatch = useDispatch();



  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(replaceToNewUsers(res));
    };

    getUsers();
  }, []);

  const createUsers = () => {
    dummyData.forEach(async (dummy) => {
      await addDoc(usersCollectionRef, {
        first_name: dummy.first_name,
        last_name: dummy.last_name,
        email_id: dummy.email_id,
        is_paid: dummy.is_paid,
      });
    });
  };

  const deleteUsers = () => {
    usersArray.forEach(async (user) => {
      const userDoc = doc(db, "users", user.id);
      try{
        await deleteDoc(userDoc);
        dispatch(deleteAddData());
      }catch(err){
        console.log("Error occur during deleting all data : ", err);
      }
    });
  };


  return (
    <Container maxWidth="md">
      {/* <Button variant="contained" color="primary" onClick={createUsers}>Add Dummy Data</Button>
      <Button variant="contained" color="primary" onClick={deleteUsers}>Delete All Data</Button> */}

      <FilterHeader usersArray={usersArray} />

    </Container>
  );
}

export default App;
