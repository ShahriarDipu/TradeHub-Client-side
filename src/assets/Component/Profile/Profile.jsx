import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { Navigate } from "react-router";
import toast from "react-hot-toast";

import Navbar from "../Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";
import { AuthContext } from "../../../Context/AuthContext";

export default function Profile() {
  const { user, updateUserProfile, loading } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");

  useEffect(() => {
    if (user) {
      setEditName(user.displayName || "");
      setEditPhoto(user.photoURL || "");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg font-semibold">Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/loginRegister" replace />;
  }

  const { displayName, email, photoURL, metadata } = user;

  const currentName = isEditing ? editName : editName || displayName;
  const currentPhoto = isEditing ? editPhoto : editPhoto || photoURL;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile({
        displayName: editName,
        photoURL: editPhoto,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF5EE] py-10 -[#FFF5EE] dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-5xl mx-auto px-4 mb-15">

          {/* PAGE TITLE */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-300 ">
              Manage your account information and preferences
            </p>
          </div>

          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              {currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/30 text-white flex items-center justify-center text-4xl font-bold border-4 border-white">
                  {currentName?.charAt(0) || "U"}
                </div>
              )}

              <div className="text-white">
                <h2 className="text-2xl font-bold">{currentName || "User"}</h2>
                <p className="opacity-90 break-all">{email}</p>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2 dark:text-orange-600 ">
                <User className="w-5 h-5 text-orange-500" />
                Profile Information
              </h3>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            {/* INFO GRID */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 dark:bg-gray-700">
              <InfoBox
                icon={<User className="w-5 h-5 text-orange-600 " />}
                label="Full Name"
                value={
                  isEditing ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  ) : (
                    displayName || "Not provided"
                  )
                }
              />

              <InfoBox
                icon={<Camera className="w-5 h-5 text-orange-600" />}
                label="Photo URL"
                value={
                  isEditing ? (
                    <input
                      value={editPhoto}
                      onChange={(e) => setEditPhoto(e.target.value)}
                      className="border rounded px-3 py-2 w-full"
                    />
                  ) : (
                    editPhoto || "Not provided"
                  )
                }
              />

              <InfoBox
                icon={<Mail className="w-5 h-4 text-orange-600" />}
                label="Email Address"
                value={email}
              />

              <InfoBox
                icon={<Calendar className="w-5 h-5 text-orange-600" />}
                label="Member Since"
                value={new Date(metadata.creationTime).toDateString()}
              />

              <InfoBox
                icon={<Shield className="w-5 h-5 text-orange-600" />}
                label="Account Status"
                value="Active"
                highlight
              />
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoBox({ icon, label, value, highlight }) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl dark:bg-gray-500 ">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-orange-100 rounded-lg">{icon}</div>
        <span className="text-sm text-gray-500 dark:text-white">{label}</span>
      </div>
      <div
        className={`text-lg font-semibold ml-11 break-all dark:text-gray-200 ${
          highlight ? "text-green-600" : "text-gray-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
