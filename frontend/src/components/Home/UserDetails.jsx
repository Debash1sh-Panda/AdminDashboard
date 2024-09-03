import React from "react";
import { useSelector } from "react-redux";

function UserDetails() {
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      {user ? (
        <div className="text-center">
          <p className="text-sm mb-6 mt-4">Basic Details of Login User</p>
          <h1 className="text-blue-500">{user.name}</h1>
          <h1 className="text-pink-500">{user.emailId}</h1>
        </div>
      ) : (
        <h1 className="text-center">*Login to See Your Details</h1>
      )}
    </>
  );
}

export default UserDetails;
