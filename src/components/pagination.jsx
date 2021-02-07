import React from "react";
import { ApiContext } from "./_context";

import { Pagination } from "react-bootstrap";

const PaginationComponent = () => {
  const context = React.useContext(ApiContext);

  const handleClick = (num) => {
    context.setOffset(num * context.limit - context.limit);
    context.setPage(num);
  }

  return (
    <>
      {context.pages && (
        <Pagination >
          <Pagination.First onClick={() => handleClick(1)} />
          <Pagination.Prev
            disabled={context.page === 1}
            onClick={() => handleClick(context.page - 1)}
          />
          {context.page > 2 && <Pagination.Ellipsis disabled />}
          {context.page > 1 && (
            <Pagination.Item onClick={() => handleClick(context.page - 1)}>
              {context.page - 1}
            </Pagination.Item>
          )}
          <Pagination.Item active onClick={() => handleClick(context.page)}>
            {context.page}
          </Pagination.Item>
          {context.page < context.pages && (
            <Pagination.Item onClick={() => handleClick(context.page + 1)}>
              {context.page + 1}
            </Pagination.Item>
          )}
          {context.page < context.pages - 2 && <Pagination.Ellipsis disabled />}
          <Pagination.Next
            disabled={context.page === context.pages}
            onClick={() => handleClick(context.page + 1)}
          />
          <Pagination.Last onClick={() => handleClick(context.pages)} />
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
