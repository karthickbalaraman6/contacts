const express = require("express");
const cors = require("cors");
 
const app = express();
 
// MIDDLEWARE
app.use(cors());
app.use(express.json());
 
let contacts = [];
 
// CREATE
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;
 
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
 
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
 
  contacts.push(newContact);
  res.status(201).json(newContact);
});
 
// READ ALL
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});
 
// READ ONE
app.get("/api/contacts/:id", (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
 
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
 
  res.json(contact);
});
 
// UPDATE
app.put("/api/contacts/:id", (req, res) => {
  const { name, email, phone } = req.body;
 
  let found = false;
 
  contacts = contacts.map(c => {
    if (c.id === req.params.id) {
      found = true;
      return { ...c, name, email, phone };
    }
    return c;
  });
 
  if (!found) {
    return res.status(404).json({ message: "Contact not found" });
  }
 
  res.json({ message: "Contact updated successfully" });
});
 
// DELETE
app.delete("/api/contacts/:id", (req, res) => {
  const initialLength = contacts.length;
 
  contacts = contacts.filter(c => c.id !== req.params.id);
 
  if (contacts.length === initialLength) {
    return res.status(404).json({ message: "Contact not found" });
  }
 
  res.json({ message: "Contact deleted successfully" });
});
 
// SERVER START
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});