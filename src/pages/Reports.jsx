import { useEffect, useState } from "react";

// Api base url
import api from "../api";

// Axios
import axios from "axios";

// Data
import reportTypes from "../data/reportTypes";

// Hooks
import useTelegram from "../hooks/useTelegram";

// Utils
import { encryptId, formatData } from "../utils";

// Redux
import {
  updateData,
  updateError,
  updateLoader,
} from "../store/features/dataSlice";
import { useDispatch, useSelector } from "react-redux";

// Components
import Icon from "../components/Icon";
import CustomPieChart from "../components/CustomPieChart";

// Images
import moneyIcon from "../assets/images/icons/money.svg";
import reloadIcon from "../assets/images/icons/reload.svg";

const Reports = () => {
  const dispatch = useDispatch();
  const { user, tg } = useTelegram();
  useEffect(() => tg.setHeaderColor("#f5f5f5"), []);
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const [reportType, setReportType] = useState("month");
  const { data, loader, error } = useSelector((state) => state.data);
  const [reports, setReports] = useState({
    data: [],
    total: 0,
    income: { total: 0, data: [] },
    expense: { total: 0, data: [] },
  });

  const fetchData = () => {
    dispatch(updateError(false));
    dispatch(updateLoader(true));

    const apiUrl = `${api}?userId=${encryptId(
      user?.id || 298444246,
      secretKey
    )}&time=${reportType}`;

    axios
      .get(apiUrl)
      .then(({ data: res }) => {
        if (res?.success) {
          setReports(formatData(res.data));
          dispatch(updateData({ type: reportType, data: res.data }));
        } else {
          dispatch(updateError(true));
          alert(res?.message || "Xatolik!");
        }
      })
      .catch(() => dispatch(updateError(true)))
      .finally(() => dispatch(updateLoader(false)));
  };

  useEffect(() => {
    if (data[reportType]) {
      dispatch(updateError(false));
      dispatch(updateLoader(false));
      setReports(formatData(data[reportType]));
    } else fetchData();
  }, [reportType]);

  return (
    <div className="pb-10">
      {/* Top */}
      <div className="sticky top-0 inset-x-0 z-10 bg-gradient-to-b from-[#f5f5f5] to-white border-b">
        <div className="container py-3.5">
          <div className="flex items-center h-10 gap-1.5">
            {reportTypes.map(({ value, label, disabled }, index) => (
              <button
                key={index}
                disabled={disabled || loader}
                onClick={() => setReportType(value)}
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
        </div>
      </div>

      {/* Body */}
      <main className="overflow-x-hidden container">
        <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2">
          {/* Loading animation */}
          {!error && loader && (
            <div className="animate-spin size-9 border-[3px] border-primary border-y-transparent rounded-full" />
          )}

          {/* Reload button */}
          {!loader && error && (
            <button onClick={fetchData} disabled={loader}>
              <Icon
                size={32}
                src={reloadIcon}
                alt="Reload icon"
                className="size-11"
              />
            </button>
          )}
        </div>

        {/* Reports */}
        {!error && !loader && (
          <div className="space-y-12">
            {/* Income & Expense */}
            <div className="space-y-5">
              {/* Main Reports Pie Chart */}
              <CustomPieChart data={reports?.data || []} className="mt-8" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Icon src={moneyIcon} className="size-8" />
                  <b className="font-bold text-dark text-lg">
                    Jami {reports?.total >= 0 ? "foyda" : "zarar"}
                  </b>
                </div>

                <span className="font-bold">
                  {reports?.total?.toLocaleString() || 0}
                  <span> so'm</span>
                </span>
              </div>
            </div>

            {/* Income */}
            <section className="space-y-5">
              {/* Section title */}
              <h2 className="text-2xl font-bold">Kirim</h2>

              {/* Section content */}
              <CustomPieChart data={reports?.income?.data || []} />
            </section>

            {/* Expense */}
            <section className="space-y-5">
              {/* Section title */}
              <h2 className="text-2xl font-bold">Chiqim</h2>

              {/* Section content */}
              <CustomPieChart data={reports?.expense?.data || []} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reports;
