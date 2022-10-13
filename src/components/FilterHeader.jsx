import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import {
  Typography,
  Box,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { togglePaidStudents, updateQuery } from "../reduxFolder/querySlice";
import { setCurrentPage, setMaxPageNumberLimit, setMinPageNumberLimit } from "../reduxFolder/paginationSlice";


function FilterHeader(props) {
  const {usersArray} = props;

  const queryString = useSelector((state)=> state.query.queryString)
  const showPaidStudent = useSelector((state)=> state.query.showPaidStudents)
  const pageNumberLimit = useSelector((state)=> state.pagination.pageNumberLimit);
  const dispatch = useDispatch();


  const [queryResult, setQueryResult] = useState([]);


  useEffect(()=>{
    const sortedData = [...usersArray];
    sortedData.sort((a,b)=>a.first_name.localeCompare(b.first_name));
    setQueryResult(sortedData);
  },[usersArray])



  //------------------SEARCH----------------

  const searchFields = ["first_name", "last_name", "email_id"];

  useEffect(() => {
    const searchResult = usersArray.filter((user) =>
      searchFields.some((field) =>
        user[field].toLowerCase().includes(queryString.toLowerCase())
      )
    );

    const newResult = showPaidStudent
      ? searchResult.filter((user) => user.is_paid === true)
      : searchResult;

    newResult.sort((a,b)=>a.first_name.localeCompare(b.first_name));

    setQueryResult(newResult);


    //restoring default paging
    dispatch(setCurrentPage(1));
    dispatch(setMinPageNumberLimit(0));
    dispatch(setMaxPageNumberLimit(pageNumberLimit));
  }, [queryString, showPaidStudent]);


  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        style={{ display: "flex", justifyContent: "center", align: "center" }}
      >
        Users Record
      </Typography>

      <Box display="flex" alignContent="center" justifyContent="center">
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          style={{ width: 300 }}
          onChange={(e) => dispatch(updateQuery(e.target.value))}
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={showPaidStudent}
              onChange={(e) => dispatch(togglePaidStudents(e.target.checked))}
            />
          }
          label="Show Paid Students"
          labelPlacement="start"
        />
      </Box>
      <Pagination queryResult={queryResult} />
    </>
  );
}

export default FilterHeader;
