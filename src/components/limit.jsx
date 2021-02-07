import React from "react";
import { ApiContext } from "./_context";

import { FormControl, InputGroup } from "react-bootstrap";

const LimitComponent = () => {
  const data = React.useContext(ApiContext);
  const [limit, setLimit] = React.useState(data.limit);

  function handleChange(e) {
    if (e !== "" && +e <= data.items) {
      data.setLimit(e);
      setLimit(e);
    }
  }

  return (
    <>
      {data.limit} / {limit}
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>items on page:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          value={limit}
          onChange={(e) => handleChange(e.target.value)}
        />
      </InputGroup>
    </>
  );
};

export default LimitComponent;
