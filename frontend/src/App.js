import Login from "./pages/Login";

import AdminDashboard
from "./pages/AdminDashboard";

import UserDashboard
from "./pages/UserDashboard";


function App() {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");


  if (!token) {

    return <Login />;
  }

  if (role === "ADMIN") {

    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

export default App;