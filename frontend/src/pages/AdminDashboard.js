import { useEffect, useState } from "react";

import api from "../services/api";


function AdminDashboard() {

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  useEffect(() => {

    getTasks();

    getUsers();

  }, []);


  const getTasks = async () => {

    const response = await api.get(
      "tasks/"
    );

    setTasks(response.data);
  };


  const getUsers = async () => {

    const response = await api.get(
      "users/"
    );

    setUsers(response.data);
  };


  const createTask = async () => {

    try {

      await api.post(
        "tasks/create/",
        {
          title,
          description,
          assigned_to: assignedTo,
        }
      );

      alert("Task Created");

      getTasks();

    } catch (error) {

      alert("Error");
    }
  };


  const logout = () => {

    localStorage.clear();

    window.location.reload();
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <h2>Create Task</h2>

      <input
        placeholder="Title"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <select
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
      >

        <option>Select User</option>

        {
          users.map((user) => (

            <option
              key={user.id}
              value={user.id}
            >
              {user.username}
            </option>
          ))
        }

      </select>

      <br /><br />

      <button onClick={createTask}>
        Create Task
      </button>

      <hr />

      <h2>All Tasks</h2>

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

            <p>
              Assigned To:
              {task.assigned_to_name}
            </p>

          </div>
        ))
      }

    </div>
  );
}

export default AdminDashboard;