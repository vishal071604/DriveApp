import { useEffect, useState } from "react";
import axios from "axios";


export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const API = "http://localhost:3000/api";

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API}/files`, {
        withCredentials: true,
      });
      setFiles(res.data);
    } catch (err) {
      console.log(err);
      alert("Please login first");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API}/files/upload`, formData, {
      withCredentials: true,
    });

    setFile(null);
    fetchFiles();
  };

  const deleteFile = async (id) => {
    await axios.delete(`${API}/files/${id}`, {
      withCredentials: true,
    });

    fetchFiles();
  };

  // ✅ ADD HERE
  const logout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, {
        withCredentials: true,
      });

      alert("Logout successful");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Logout failed");
    }
  };

  // existing code...

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <h1 className="font-bold text-xl">My Drive</h1>
        <button className="bg-red-500 px-4 py-1 rounded"  onClick={logout}>Logout</button>
      </nav>

      <div className="p-6">
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-bold mb-3">Upload File</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={uploadFile}
            className="ml-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>

        <h2 className="font-bold text-xl mb-4">My Files</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {files.map((f) => (
            <div key={f._id} className="bg-white p-4 rounded shadow">
              <p className="font-medium truncate">{f.fileName}</p>
              <p className="text-sm text-gray-500">{f.fileType}</p>

              <div className="flex justify-between mt-4">
                <a
                  href={f.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  View
                </a>

                <button
                  onClick={() => deleteFile(f._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}