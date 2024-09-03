import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { useSelector } from "react-redux";

function AdminHome() {
  useGetAllUsers();
  const { allUser, searchUserByText } = useSelector((store) => store.user);

  // Filter users based on the search text
  const filteredUsers = allUser?.filter((user) => user.role === "user");

  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    const filteredUser =
      filteredUsers.length > 0 &&
      filteredUsers.filter((user) => {
        if (!searchUserByText) {
          return true;
        }

        const searchText = searchUserByText.toLowerCase();
        return (
          user?.name?.toLowerCase().includes(searchText) ||
          user?.emailId?.toLowerCase().includes(searchText) ||
          (user?.count?.toString() || "").toLowerCase().includes(searchText)
        );
      });
    setFilterUser(filteredUser);
  }, [filteredUsers, searchUserByText]);

  return (
    <div>
      <Navbar />
      {filterUser && filterUser.length > 0 ? (
        <div className="overflow-x-auto p-4 mt-5">
          <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
          <table className="table w-full border-collapse border border-gray-200">
            <thead>
              <tr className="text-center bg-blue-300 text-black">
                <th className="border border-gray-300 p-2">S.No</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Gender</th>
                <th className="border border-gray-300 p-2">Count</th>
                <th className="border border-gray-300 p-2">Last Login Date</th>
              </tr>
            </thead>
            <tbody>
              {filterUser.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-100 hover:text-blue-950 text-center"
                >
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{user?.name}</td>
                  <td className="border border-gray-300 p-2">
                    {user?.emailId}
                  </td>
                  <td className="border border-gray-300 p-2">{user?.gender}</td>
                  <td className="border border-gray-300 p-2">{user?.count}</td>
                  <td className="border border-gray-300 p-2">
                    {user?.lastLoginDate?.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-4 text-center m-4">No users found.</p>
      )}
    </div>
  );
}

export default AdminHome;
