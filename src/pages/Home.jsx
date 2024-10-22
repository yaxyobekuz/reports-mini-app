import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Axios
import axios from "axios";

// Utils
import { filterByDate } from "../utils";

import Icon from "../components/Icon";
import PieChart from "../components/PieChart";

// Images
import moneyIcon from "../assets/images/icons/money.svg";
import settingsIcon from "../assets/images/icons/settings.svg";

const Home = () => {
  // Dates
  const today = new Date();
  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  // States
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [chartData, setChartData] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${apiBaseUrl}?start=${new Date("01-01-1900")}&end=${today}`;

  console.log(apiUrl);
  

  // Fetch data from API
  useEffect(() => {
    setLoader(true);

    axios
      .get(apiUrl)
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  // Calculate reports
  useEffect(() => {
    if (data.length > 0) {
      let income = 0;
      let expense = 0;

      data.forEach((item) => {
        const value = item[3];
        const type = item[1]?.toString()?.toLowerCase();

        if (type === "income") {
          income += value;
        } else {
          expense += value;
        }
      });

      setTotal(income - expense);

      setChartData([
        {
          id: "Kirim",
          label: "Kirim",
          value: income,
        },
        {
          id: "Chiqim",
          label: "Chiqim",
          value: expense,
        },
      ]);
    }
  }, [data]);

  return (
    <div className="py-4">
      <div className="container h-full">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Oylik hisobot</h1>

          {/* settings link */}
          <Link
            to="/settings"
            className="flex items-center justify-center size-12 bg-secondary rounded-full"
          >
            <Icon src={settingsIcon} className="size-7" />
          </Link>
        </header>

        {/* Body */}
        <main>
          {loader ? (
            <div className="flex items-center justify-center h-[calc(100vh-144px)]">
              <div className="animate-spin size-8 border-2 border-primary border-y-white rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Chart */}
              <PieChart data={chartData} className="mt-8" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Icon src={moneyIcon} className="size-8" />
                  <b className="font-bold text-dark text-lg">
                    Jami {total >= 0 ? "foyda" : "zarar"}
                  </b>
                </div>

                <span>
                  {total?.toLocaleString()}
                  <span> so'm</span>
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
