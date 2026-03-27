import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAppContext } from "../context/AppContext";

const apiUrl = import.meta.env.VITE_BACKEND_SOCKET_URI;

export default function LogViewer({ email }) {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef(null);

  const {addProjectLogs} = useAppContext()

  useEffect( () => {
    const project = localStorage.getItem('project')
    const projObj = JSON.parse(project)
    const logMessages = projObj.logs
    setLogs(logMessages)
  }, [] )

  useEffect(() => {
    const socket = io(`${apiUrl}`);
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("subscribe", `logs:${email}`);
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("message", (data) => {
      let parsed;
      if (typeof data === "string") {
        try {
          parsed = JSON.parse(data);
        } catch {
          setLogs((prev) => [data, ...prev]);
          addProjectLogs(data)
          return;
        }
      } else {
        parsed = data;
      }

      const logText = parsed?.log ?? parsed?.message ?? String(parsed);
      setLogs((prev) => [logText, ...prev]);
      addProjectLogs(logText)
    });

    return () => socket.disconnect();
  }, [email]);

  return (
    <div className="h-[60%] bg-white rounded-2xl shadow-md p-6 overflow-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-semibold">Build Logs</h1>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {connected ? "● Connected" : "○ Disconnected"}
        </span>
      </div>

      {/* Logs */}
      <div className="h-64 overflow-y-auto space-y-1 pr-2">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-sm">Waiting for logs...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-3 font-mono text-sm">
              <span className="text-gray-400 select-none flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-gray-700">{log}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}