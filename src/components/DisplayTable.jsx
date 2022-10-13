import React from "react";

import { db } from "../firebase-config";
import {
  updateDoc,
  doc,
} from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { markAsPaid } from "../reduxFolder/userSlice";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function DisplayTable(props) {
  const { currentItems } = props;
  

  const showPaidStudent = useSelector((state) => state.query.showPaidStudents);
  const dispatch = useDispatch();

  const updatePayStatus = async (id) => {
    const userDoc = doc(db, "users", id);
    const newPayStatus = { is_paid: true };

    try {
      await updateDoc(userDoc, newPayStatus);
      dispatch(markAsPaid(id));
    } catch (err) {
      console.log("Updation not working", err);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Amount</TableCell>
              {!showPaidStudent && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((user, index) => (
              <TableRow
                key={user.id || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                >{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email_id}</TableCell>
                <TableCell>{user.is_paid ? "YES" : "NO"}</TableCell>
                {!showPaidStudent && (
                  <TableCell>
                    {user.is_paid ? null : (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          updatePayStatus(user.id);
                        }}
                      >
                        Mark as paid
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DisplayTable;
