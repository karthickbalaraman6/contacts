const BASE_URL = "http://13.233.97.172:5000/api";

export const getContacts = async () => {
  const res = await fetch(`${BASE_URL}/contacts`);
  return res.json();
};

export const addContact = async (contact) => {
  const res = await fetch(`${BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  return res.json();
};

export const updateContact = async (id, data) => {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteContact = async (id) => {
  await fetch(`${BASE_URL}/contacts/${id}`, {
    method: "DELETE",
  });
};
