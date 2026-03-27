import React from 'react'

function Log() {
  return (
    <div className="h-[60%] bg-white rounded-2xl shadow-md p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Logs</h2>
        <div className="text-sm text-gray-600 space-y-2">
        {Array.isArray(user.project.logs) && user.project.logs.length > 0 ? (
            user.project.logs.map((item, index) => {
                const logText = (() => {
                    if (typeof item === 'string') {
                        try {
                            const parsed = JSON.parse(item)
                            if (parsed && typeof parsed === 'object' && parsed.log) return parsed.log
                            if (typeof parsed === 'string') return parsed
                        } catch (e) {
                            // not JSON
                        }
                        return item
                    }
                    if (item && typeof item === 'object') {
                        if ('log' in item) return item.log
                        if ('message' in item) return item.message
                        return JSON.stringify(item)
                    }
                    return String(item)
                })()

                return <p key={index}>• {logText}</p>
            })
        ) : (
            <p>No logs available</p>
        )}
        </div>
    </div>
  )
}

export default Log
