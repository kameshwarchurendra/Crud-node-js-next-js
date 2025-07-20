import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [editId, setEditId] = useState(null);

  const apiUrl = 'http://localhost:5000/api/users';

  const fetchUsers = async () => {
    const res = await axios.get(apiUrl);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${apiUrl}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(apiUrl, form);
    }
    setForm({ name: '', email: '', age: '' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchUsers();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 User Management</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          {editId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <h2 style={styles.subHeading}>📋 User List</h2>
        <table style={styles.table}>
        <thead>
            <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.age}</td>
                <td style={styles.td}>
                <button style={styles.editBtn} onClick={() => handleEdit(user)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

    </div>
  );
}

const styles = {
    container: {
      padding: '2rem',
      maxWidth: '600px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2rem',
      color: '#333',
    },
    subHeading: {
      marginTop: '3rem',
      fontSize: '1.5rem',
      color: '#555',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      backgroundColor: '#f9f9f9',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    input: {
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      backgroundColor: '#0070f3',
      color: '#fff',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      backgroundColor: '#fff',
      padding: '1rem',
      marginTop: '1rem',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    editBtn: {
      backgroundColor: '#f0ad4e',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 0.75rem',
      marginRight: '0.5rem',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    deleteBtn: {
      backgroundColor: '#d9534f',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0 0 8px rgba(0,0,0,0.05)',
        borderRadius: '8px',
        overflow: 'hidden',
      },
      th: {
        textAlign: 'left',
        padding: '0.75rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
      },
      td: {
        padding: '0.75rem',
        borderBottom: '1px solid #eee',
      },
      tr: {
        transition: 'background 0.2s ease-in-out',
      },
      
  };
