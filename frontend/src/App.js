import React, { useEffect, useState } from "react";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (editId) {
      await updateContact(editId, { name, email, phone });
      setEditId(null);
    } else {
      await addContact({ name, email, phone });
    }

    clearFields();
    loadContacts();
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteContact(id);
    loadContacts();
  };

  // EDIT
  const handleEdit = (c) => {
    setName(c.name);
    setEmail(c.email);
    setPhone(c.phone);
    setEditId(c.id);
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "#2c5aa0",
          color: "white",
          padding: "15px",
          fontSize: "22px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        📒 <span>Contact Book</span>
      </div>

      <div style={{ width: "70%", margin: "auto", textAlign: "center" }}>
        
        <h2>Add Contact</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />

        <button
          style={{ background: "green", color: "white" }}
          onClick={handleSubmit}
        >
          {editId ? "Update" : "Add"}
        </button>

        {/* TABLE */}
        <table border="1" style={{ width: "100%", marginTop: "20px", background: "white" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    style={{ background: "orange", color: "white" }}
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ background: "red", color: "white" }}
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;
