import React from "react";
import Navbar from "../Shared/Navbar";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { useSelector } from "react-redux";
import UserCountChart from "./UserCountChart";

function AdminGraph() {
  useGetAllUsers();
  const { allUser } = useSelector((store) => store.user);

  // Filter out users with role 'user'
  const userOnly = allUser.filter((user) => user.role === "user");

  // Transform data to get user count by month and year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 7);
  };

  const userData = userOnly.map((user) => ({
    date: formatDate(user?.lastLoginDate),
    count: 1,
  }));

  // Aggregate the counts by formatted date
  const aggregatedData = userData.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += curr.count;
    return acc;
  }, {});

  // Convert aggregated data to an array and sort by date
  const chartData = Object.keys(aggregatedData)
    .map((key) => ({
      date: key,
      count: aggregatedData[key].toFixed(2),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Convert YYYY-MM format to "Month Year" for display
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4 md:mt-5">Admin Dashboard</h1>
        <div className="flex justify-between m-10">
          <div className="border border-black inline-block text-center rounded-md md:p-3 bg-slate-400 text-black">
            <span className="font-bold md:text-2xl">{userOnly.length}</span>{" "}
            <p className="text-sm">Total User Count</p>
          </div>
          <div className="border border-black inline-block text-center rounded-md md:p-3 bg-slate-400 text-black">
            <span className="font-bold md:text-2xl">
              {userOnly.reduce((acc, user) => acc + (user?.count || 0), 0)}
            </span>
            <p className="text-sm">Total Click Count</p>
          </div>
        </div>
        {chartData.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            <UserCountChart
              className=" w-32"
              userData={chartData.map((item) => ({
                date: formatDisplayDate(item.date),
                count: parseFloat(item.count),
              }))}
            />
          </div>
        ) : (
          <p>No user data available for the chart.</p>
        )}
      </div>
    </div>
  );
}

export default AdminGraph;
