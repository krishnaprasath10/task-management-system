import { useEffect, useState } from "react";

import api from "../services/api";


function UserDashboard() {

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {

    getTasks();

  }, []);


  const getTasks = async () => {

    const response = await api.get(
      "tasks/"
    );

    setTasks(response.data);
  };


  const updateStatus = async (
    id,
    status
  ) => {

    await api.patch(
      `tasks/update/${id}/`,
      {
        status,
      }
    );

    getTasks();
  };


  const logout = () => {

    localStorage.clear();

    window.location.reload();
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>User Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      {
        tasks.map((task) => (

          <div
            key={task.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(
                  task.id,
                  e.target.value
                )
              }
            >

              <option>
                Pending
              </option>

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>

            </select>

          </div>
        ))
      }

    </div>
  );
}

export default UserDashboard;