import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import UserItem from "../components/UserItem";

import { Container, BDiv } from "bootstrap-4-react";
import AdminNavLink from "../components/AdminNavLink";

const AdminScreen = () => {
  const [list, setList] = useState([]);
  const { items, getUser } = useFirestore();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getUser().then(() => setList(items));
  }, [update]);

  return (
    <Container>
      <AdminNavLink />
      <BDiv className="row">
        {list.map((item) => (
          <UserItem
            key={item.id}
            item={item}
            setUpdate={setUpdate}
            update={update}
          />
        ))}
      </BDiv>
    </Container>
  );
};

export default AdminScreen;
