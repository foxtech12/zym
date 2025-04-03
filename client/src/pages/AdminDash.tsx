import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const AdminDash: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact/get`,
        ); // Adjust API URL if needed
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Function to export contacts as Excel file
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    XLSX.writeFile(workbook, 'Contacts.xlsx');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-black p-4 text-white">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
          >
            Admin ▼
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 rounded-md bg-gray-900 shadow-md">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-white hover:bg-red-500 hover:text-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Contact List Table */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Contact List</h2>
          <button
            onClick={exportToExcel}
            className="rounded bg-black py-2 px-4 font-bold text-white hover:bg-gray-800"
          >
            Export as Excel
          </button>
        </div>

        {/* Loading & Error Handling */}
        {loading && <p className="text-gray-700">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 bg-black text-white shadow-md">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-2">Name</th>
                  <th className="border border-gray-600 px-4 py-2">Email</th>
                  <th className="border border-gray-600 px-4 py-2">Message</th>
                  <th className="border border-gray-600 px-4 py-2">Date</th>
                  <th className="border border-gray-600 px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border border-gray-600 text-center hover:bg-gray-700"
                  >
                    <td className="border border-gray-600 px-4 py-2">
                      {contact.name}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {contact.email}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {contact.message}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {new Date(contact.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {contact.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
