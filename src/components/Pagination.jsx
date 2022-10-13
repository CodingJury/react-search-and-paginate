import { Button, Typography, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setItemsPerPage, setMinPageNumberLimit, setMaxPageNumberLimit } from "../reduxFolder/paginationSlice";
import DisplayTable from "./DisplayTable";


function Pagination(props) {
  const { queryResult } = props;
  const dispatch = useDispatch();
  


  const currentPage = useSelector((state)=> state.pagination.currentPage);
  const itemsPerPage = useSelector((state)=> state.pagination.itemsPerPage);

  const pageNumberLimit = useSelector((state)=> state.pagination.pageNumberLimit);
  const minPageNumberLimit = useSelector((state)=> state.pagination.minPageNumberLimit);
//   dispatch(setMaxPageNumberLimit(pageNumberLimit));
  const maxPageNumberLimit = useSelector((state)=> state.pagination.maxPageNumberLimit);

  const handleClick = (event) => {
    dispatch(setCurrentPage(Number(event.currentTarget.id)));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(queryResult.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = queryResult.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number > minPageNumberLimit && number < maxPageNumberLimit + 1) {
      return (
        <Button color="primary"
          id={number}
          key={number}
          onClick={handleClick}
          variant={currentPage === number ? "contained" : null}
        >
          {number}
        </Button>
      );
    } else {
      return null;
    }
  });

  const handlePrevBtn = () => {
    dispatch(setCurrentPage(currentPage - 1));

    if ((currentPage - 1) % pageNumberLimit === 0) {
      dispatch(setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit));
      dispatch(setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit));
    }
  };

  const handleNextBtn = () => {
    dispatch(setCurrentPage(currentPage + 1));

    if (currentPage + 1 > maxPageNumberLimit) {
      dispatch(setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit));
      dispatch(setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit));
    }
  };

  let pageDecrementBtn = null;
  if (currentPage > pageNumberLimit) {
    pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>;
  }

  const handleLoadMore = () => {
    dispatch(setItemsPerPage(itemsPerPage + 5));
    dispatch(setCurrentPage(1));
    dispatch(setMinPageNumberLimit(0));
    dispatch(setMaxPageNumberLimit(pageNumberLimit));
  };

  return (
    <>

    
    <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
      <DisplayTable currentItems={currentItems} />
      {currentItems.length!==0 ? 
      <>
        <Stack style={{ marginTop: "20px"}} direction="row">
          
          <Button color="primary"
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </Button>
          
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <Button color="primary"
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </Button>
        </Stack>
        <Button variant="contained" color="secondary" style={{marginTop: "20px"}} className="loadmore" onClick={handleLoadMore}>
          Load More
        </Button>
      </>
      :
      <Typography
        variant="h3"
        gutterBottom
        style={{ display: "flex", justifyContent: "center", align: "center", marginTop: "10px" }}
      >
        No Record Found
      </Typography>
      }
    </div>
    </>
  );
}

export default Pagination;
