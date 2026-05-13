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

  const [newUsername, setNewUsername] =
    useState("");

  const [newEmail, setNewEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");


  useEffect(() => {

    getTasks();

    getUsers();

  }, []);


  const getTasks = async () => {

    try {

      const response = await api.get(
        "tasks/"
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  const getUsers = async () => {

    try {

      const response = await api.get(
        "users/"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
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

      setTitle("");
      setDescription("");
      setAssignedTo("");

      getTasks();

    } catch (error) {

      console.log(error);

      alert("Error Creating Task");
    }
  };


  const createUser = async () => {

    try {

      await api.post(
        "users/create/",
        {
          username: newUsername,
          email: newEmail,
          password: newPassword,
          role: "USER",
        }
      );

      alert("User Created");

      setNewUsername("");
      setNewEmail("");
      setNewPassword("");

      getUsers();

    } catch (error) {

      console.log(error);

      alert("Error Creating User");
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

      <h2>Create User</h2>

      <input
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) =>
          setNewUsername(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={newEmail}
        onChange={(e) =>
          setNewEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={createUser}>
        Create User
      </button>

      <hr />

      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <select
        value={assignedTo}
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
      >

        <option value="">
          Select User
        </option>

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
              borderRadius: "10px",
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Status:</strong>
              {" "}
              {task.status}
            </p>

            <p>
              <strong>Assigned To:</strong>
              {" "}
              {task.assigned_to_name}
            </p>

          </div>
        ))
      }

    </div>
  );
}

export default AdminDashboard;