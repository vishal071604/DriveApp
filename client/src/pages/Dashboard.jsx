import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  // =========================
  // API URL
  // =========================

  const API = process.env.REACT_APP_API_URL;

  // =========================
  // FETCH FILES
  // =========================

  const fetchFiles = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/files`, {
        withCredentials: true,
      });

      setFiles(res.data);
    } catch (err) {
      console.error("Fetch files error:", err);

      alert("Please login first");
      navigate("/login");
    }
  }, [API, navigate]);

  // =========================
  // LOAD FILES
  // =========================

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // =========================
  // UPLOAD FILE
  // =========================

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      await axios.post(
        `${API}/files/upload`,
        formData,
        {
          withCredentials: true,
        }
      );

      alert("File uploaded successfully");

      setFile(null);

      // Reset file input
      document.getElementById("fileInput").value = "";

      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);

      alert(
        err.response?.data?.message ||
          "File upload failed"
      );
    }
  };

  // =========================
  // DELETE FILE
  // =========================

  const deleteFile = async (id) => {
    try {
      await axios.delete(
        `${API}/files/${id}`,
        {
          withCredentials: true,
        }
      );

      alert("File deleted successfully");

      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);

      alert(
        err.response?.data?.message ||
          "File deletion failed"
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {
    try {
      await axios.post(
        `${API}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      alert("Logout successful");

      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);

      alert("Logout failed");
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">

        <h1 className="font-bold text-xl">
          My Drive
        </h1>

        <button
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>

      </nav>

      {/* MAIN CONTENT */}

      <div className="p-6">

        {/* UPLOAD SECTION */}

        <div className="bg-white p-4 rounded shadow mb-6">

          <h2 className="font-bold mb-3">
            Upload File
          </h2>

          <input
            id="fileInput"
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            onClick={uploadFile}
            className="ml-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>

        </div>

        {/* FILE LIST */}

        <h2 className="font-bold text-xl mb-4">
          My Files
        </h2>

        {files.length === 0 ? (
          <p className="text-gray-500">
            No files uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {files.map((f) => (

              <div
                key={f._id}
                className="bg-white p-4 rounded shadow"
              >

                <p className="font-medium truncate">
                  {f.fileName}
                </p>

                <div className="flex justify-between mt-4">

                  <a
                    href={f.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>

                  <button
                    onClick={() =>
                      deleteFile(f._id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}