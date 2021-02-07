import React from "react";
import { useParams } from "react-router-dom";


const useSingle = () => {
  let params = useParams();

  const [item, setItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLaunches = async () => {
      const fullResponse = await fetch(`http://localhost:3001/?flightNumber=${params.num}`);
      const responseJson = await fullResponse.json();
      setIsLoading(false);
      setItem(responseJson.content);

    };
    fetchLaunches();
  }, [isLoading]);

  return [item, isLoading];
};

export default useSingle;
