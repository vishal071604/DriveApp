
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // =========================
  // FETCH FILES
  // =========================

  const fetchFiles = useCallback(async () => {
    try {
      const res = await API.get("/files");

      setFiles(res.data);
    } catch (err) {
      console.error("Fetch files error:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert(
          err.response?.data?.message ||
            "Unable to load files"
        );
      }
    }
  }, [navigate]);

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

      await API.post("/files/upload", formData);

      alert("File uploaded successfully ✅");

      setFile(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      alert(
        err.response?.data?.message ||
          "File upload failed ❌"
      );
    }
  };

  // =========================
  // DELETE FILE
  // =========================

  const deleteFile = async (id) => {
    try {
      await API.delete(`/files/${id}`);

      alert("File deleted successfully ✅");

      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      alert(
        err.response?.data?.message ||
          "File deletion failed ❌"
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {
    try {
      await API.post("/auth/logout");

      alert("Logout successful ✅");

      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);

      alert(
        err.response?.data?.message ||
          "Logout failed ❌"
      );
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
          type="button"
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
            ref={fileInputRef}
            id="fileInput"
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            type="button"
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

                  {/* VIEW */}
                  <a
                    href={f.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>

                  {/* DELETE */}
                  <button
                    type="button"
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

