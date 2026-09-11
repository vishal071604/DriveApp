import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Dashboard() {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    // Get files
    const fetchFiles = async () => {
        try {
            const response = await API.get("/files");

            setFiles(response.data);

        } catch (error) {
            alert("Unable to load files");
        }
    };

    // Load files when page opens
    useEffect(() => {
        fetchFiles();
    }, []);

    // Upload file
    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("file", file);

            await API.post("/files/upload", formData);

            alert("File uploaded successfully");

            setFile(null);

            fetchFiles();

        } catch (error) {
            alert("File upload failed");
        }
    };

    // Delete file
    const deleteFile = async (id) => {
        try {
            await API.delete(`/files/${id}`);

            alert("File deleted successfully");

            fetchFiles();

        } catch (error) {
            alert("File deletion failed");
        }
    };

    // Logout
    const logout = async () => {
        try {
            await API.post("/auth/logout");

            alert("Logout successful");

            navigate("/login");

        } catch (error) {
            alert("Logout failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">

                <h1 className="font-bold text-xl">
                    My Drive
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>

            </nav>

            {/* Main Content */}
            <div className="p-6">

                {/* Upload Section */}
                <div className="bg-white p-4 rounded shadow mb-6">

                    <h2 className="font-bold mb-3">
                        Upload File
                    </h2>

                    <input
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

                {/* File List */}
                <h2 className="font-bold text-xl mb-4">
                    My Files
                </h2>

                {files.length === 0 ? (

                    <p className="text-gray-500">
                        No files uploaded yet.
                    </p>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {files.map((file) => (

                            <div
                                key={file._id}
                                className="bg-white p-4 rounded shadow"
                            >

                                <p className="font-medium truncate">
                                    {file.fileName}
                                </p>

                                <div className="flex justify-between mt-4">

                                    <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View
                                    </a>

                                    <button
                                        onClick={() =>
                                            deleteFile(file._id)
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