import React, { useState } from "react";

const UserTable = ({ users }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [page, setPage] = useState(1);

  const usersPerPage = 6;

  // FILTER + SEARCH
  const filtered = users
    .filter(
      (user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => (domainFilter ? u.email.endsWith(domainFilter) : true));

  // SORT
  if (sortBy === "name") {
    filtered.sort((a, b) => a.first_name.localeCompare(b.first_name));
  } else if (sortBy === "email") {
    filtered.sort((a, b) => a.email.localeCompare(b.email));
  }

  // PAGINATION (SLICING)
  const start = (page - 1) * usersPerPage;
  const paginatedUsers = filtered.slice(start, start + usersPerPage);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md">
        
        {/* Search + Sort + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded w-full"
          />

          <select
            className="border px-3 py-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="name">First Name</option>
            <option value="email">Email</option>
          </select>

          <select
            className="border px-3 py-2 rounded"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="">Filter by Domain</option>
            <option value="reqres.in">reqres.in</option>
            <option value="example.com">example.com</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Avatar</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">
                    <img src={user.avatar} className="w-10 h-10 rounded-full mx-auto" alt="" />
                  </td>
                  <td className="border p-2">{user.first_name} {user.last_name}</td>
                  <td className="p-2 border">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-4 py-2 rounded border ${n === page ? "bg-blue-600 text-white" : "bg-white"}`}
            >
              {n}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center mt-4 text-gray-600">No results found</p>
        )}
      </div>
    </>
  );
};

export default UserTable;
