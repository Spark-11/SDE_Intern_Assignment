import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import UserTable from "./components/UserTable";

const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 STEP 1: LOAD ALL USERS AT ONCE
  useEffect(() => {
    const loadAll = async () => {
      try {
        let all = [];

        // ReqRes has only 2 pages
        for (let p = 1; p <= 2; p++) {
          const res = await fetch(`/api/api/users?page=${p}`);
          const data = await res.json();
          all = [...all, ...data.data];
        }

        setAllUsers(all);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Directory</h1>

      {loading ? <Loader /> : <UserTable users={allUsers} />}
    </div>
  );
};

export default App;
