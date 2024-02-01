import React, { useEffect, useState } from "react";
import { auth, logOut, db } from "../Firebase"
import { Query, collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setname] = useState('');
  const navigate = useNavigate();

  const fetchUsername = async () => {
    try {
      const q = query(collection(db, "user"), where("uid", "===", user?.uid))
      const docs = await getDocs(q);
      const data = docs.docs[0].data();
      setname(data.name)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (loading) return
    if (!user) navigate("/");
    fetchUsername()
  }, [user, loading]);

  return (<div>Dashboard
    <div className="dashboard_container">
      Logged in as
      <div>{name}</div>
      <div>{user?.email}</div>
    </div>

    <button onClick={logOut} className="dashboard__btn">Logout</button>


  </div>
  )
}

export default Dashboard;
