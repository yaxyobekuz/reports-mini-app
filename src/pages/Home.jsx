import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

// Data
import reportTypes from "../data/reportTypes";

// Utils
import { filterByDate, reloadPage } from "../utils";

import Icon from "../components/Icon";
import CustomPieChart from "../components/CustomPieChart";

// Images
import moneyIcon from "../assets/images/icons/money.svg";
import reloadIcon from "../assets/images/icons/reload.svg";
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

  // for test
  useEffect(() => {
    console.log("Today: ", today);
    console.log("Week: ", oneWeekAgo);
    console.log("Month: ", oneMonthAgo);
  }, []);

  // States
  const incomeTxt = "income";
  const expenseTxt = "expense";
  const [total, setTotal] = useState(0);
  const [reportType, setReportType] = useState("month");
  const [mainChartData, setMainChartData] = useState([]);
  const [incomeChartData, setIncomeChartData] = useState([]);
  const [expenseChartData, setExpenseChartData] = useState([]);
  const { data, loader, error } = useSelector((state) => state.data);

  // Calculate reports
  useEffect(() => {
    if (data.length > 0) {
      let income = 0;
      let expense = 0;
      let allData = data;

      if (reportType === "day") {
        allData = filterByDate(data, oneDayAgo, today);
      } else if (reportType === "week") {
        allData = filterByDate(data, oneWeekAgo, today);
      } else if (reportType === "month") {
        allData = filterByDate(data, oneMonthAgo, today);
      } else {
        allData = data;
      }

      allData.forEach((item) => {
        const value = item[3];
        const type = item[1]?.toString()?.toLowerCase();

        type === incomeTxt ? (income += value) : (expense += value);
      });

      setTotal(income - expense);

      setMainChartData([
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

      const processData = (type) => {
        const itemsMap = {};
        const result = { total: 0, items: [] };
        const filteredData = allData.filter(
          (item) => item[1]?.toString()?.toLowerCase() === type
        );

        filteredData.forEach((item) => {
          const name = item[2];
          const value = item[3];

          result.total += value;

          if (itemsMap[name]) {
            itemsMap[name].value += value;
          } else {
            itemsMap[name] = { id: name, label: name, value };
          }
        });

        // Object to array
        result.items = Object.values(itemsMap);
        return result;
      };

      // Update income & expense chart data
      const incomeData = processData(incomeTxt);
      const expenseData = processData(expenseTxt);

      setIncomeChartData(incomeData);
      setExpenseChartData(expenseData);
    }
  }, [data, reportType]);

  return (
    <div className="pt-5">
      {/* Header */}
      <header className="flex items-center justify-between container bg-white">
        <h1 className="text-2xl font-bold">
          {reportTypes.find((type) => type.value === reportType).label}
          <span> hisobot</span>
        </h1>

        {/* settings link */}
        <Link
          to="/settings"
          className="flex items-center justify-center size-12 bg-secondary rounded-full"
        >
          <Icon src={settingsIcon} className="size-7" />
        </Link>
      </header>

      {/* Filter buttons */}
      <div className="sticky -top-1 inset-x-0 z-10 container bg-white pt-5">
        <div className="flex items-center h-12 bg-dark rounded-xl gap-1 p-1 xs:gap-1.5 xs:p-1.5 xs:h-14">
          {reportTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => setReportType(type.value)}
              className={`${
                type.value === reportType ? "bg-primary" : "bg-dark text-white"
              } flex items-center justify-center rounded-lg w-1/4 h-full transition-colors`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <main className="overflow-x-hidden container">
        {loader ? (
          <div className="flex items-center justify-center h-[calc(100vh-216px)] xs:h-[calc(100vh-224px)]">
            <div className="animate-spin size-8 border-2 border-primary border-y-white rounded-full"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-5 h-[calc(100vh-216px)] xs:h-[calc(100vh-224px)]">
            <h2 className="text-lg font-bold">Ma'lumotlarni yuklab bo'lmadi</h2>

            {/* Reload btn */}
            <button onClick={reloadPage} disabled={loader}>
              <Icon src={reloadIcon} size={32} className="size-11" />
            </button>
          </div>
        ) : (
          <div className="space-y-12 pb-32">
            <div className="space-y-5">
              {/* Main Reports Pie Chart */}
              <CustomPieChart data={mainChartData} className="mt-8" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Icon src={moneyIcon} className="size-8" />
                  <b className="font-bold text-dark text-lg">
                    Jami {total >= 0 ? "foyda" : "zarar"}
                  </b>
                </div>

                <span className="font-bold">
                  {total?.toLocaleString()}
                  <span> so'm</span>
                </span>
              </div>
            </div>

            {/* Income */}
            <section className="space-y-5">
              {/* Section title */}
              <h2 className="text-2xl font-bold">Kirim</h2>

              {/* Section content */}
              <CustomPieChart data={incomeChartData.items || []} />
            </section>

            {/* Expense */}
            <section className="space-y-5">
              {/* Section title */}
              <h2 className="text-2xl font-bold">Chiqim</h2>

              {/* Section content */}
              <CustomPieChart data={expenseChartData.items || []} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
