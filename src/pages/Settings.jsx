import { useState } from "react";

// Data
import reportTypes from "../data/reportTypes";

const Settings = () => {
  const autoDownloadType = localStorage.getItem("autoDownloadType");
  const [reportType, setReportType] = useState(autoDownloadType);

  const handleUpdateReportType = (type) => {
    if (reportType === type) {
      setReportType(null);
      return localStorage.removeItem("autoDownloadType");
    }

    setReportType(type);
    localStorage.setItem("autoDownloadType", type);
  };

  return (
    <div className="pt-5 pb-8">
      <div className="container">
        {/* Content */}
        <ul>
          <li className="space-y-3.5">
            {/* Item title */}
            <h3 className="font-semibold">
              Ma'lumotlarni avtomatik yuklab olish
            </h3>

            {/* Item content */}
            <div className="flex items-center h-10 gap-1.5">
              {reportTypes.map(({ value, label }, index) => (
                <button
                  key={index}
                  onClick={() => handleUpdateReportType(value)}
                  className={`${
                    value === reportType
                      ? "bg-secondary text-white"
                      : "bg-primary/70 text-secondary"
                  } flex items-center justify-center rounded-lg w-1/4 h-full transition-colors disabled:opacity-50`}
                >
                  {label}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
