import React, { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [items, setItems] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [launches, setLaunches] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchItems = async () => {
    const apiUrl = `http://localhost:3001?limit=${limit}&offset=${offset}`;
    const fullResponse = await fetch(apiUrl);
    const responseJson = await fullResponse.json();

    setItems(responseJson.items);
    setPages(Math.ceil(responseJson.items / limit));
    setOffset(page ? page * limit - limit : 0);
    setLaunches(responseJson);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchItems();
  }, [page, limit]);

  return (
    <ApiContext.Provider
      value={{
        page,
        pages,
        launches,
        limit,
        items,
        isLoading,
        setPage,
        setPages,
        setOffset,
        setLimit,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
