import React from "react";
import { useLocation } from "react-router-dom";
import { Link as NavLink } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

function PaginationComponent({ pageQty, setPage, page }) {
  let location = useLocation().pathname;
  return (
    <div className="pagination">
      <Pagination
        count={pageQty}
        page={page}
        onChange={(_, num) => setPage(num)}
        showFirstButton
        showLastButton
        sx={{ marginY: 3, marginX: "auto", color: "white" }}
        renderItem={(item) => (
          <PaginationItem
            component={NavLink}
            to={location === "/profile" ? `/profile` : `/`}
            {...item}
          />
        )}
      />
    </div>
  );
}

export default PaginationComponent;
