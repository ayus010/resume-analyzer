import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isWiping, setIsWiping] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            // Redirect to homepage if not authenticated
            navigate("/");
            return;
        }

        loadFiles();
    }, [isLoading, auth.isAuthenticated, navigate]);

    const handleDelete = async () => {
        try {
            setIsWiping(true);
            // Delete files one by one
            for (const file of files) {
                await fs.delete(file.path);
            }
            // Clear KV store
            await kv.flush();
            // Redirect to homepage
            navigate("/");
        } catch (error) {
            console.error("Error wiping data:", error);
            setIsWiping(false);
            loadFiles();
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl mb-6">Wipe App Data</h1>
            <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="mb-6">
                    <p className="text-xl mb-2">
                        Authenticated as:{" "}
                        <span className="font-semibold">{auth.user?.username}</span>
                    </p>
                    <p className="text-gray-600">
                        This action will delete all your resume files and data. This
                        cannot be undone.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl mb-4">Existing files:</h2>
                    {files.length === 0 ? (
                        <p className="text-gray-500">No files found</p>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-auto">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex flex-row gap-4 p-2 border-b border-gray-100"
                                >
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between">
                    <button
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded-md cursor-pointer disabled:bg-red-300"
                        onClick={handleDelete}
                        disabled={isWiping || files.length === 0}
                    >
                        {isWiping ? "Wiping Data..." : "Wipe App Data"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WipeApp;