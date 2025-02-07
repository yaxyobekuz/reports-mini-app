export const encryptId = (id, key) => {
  let encrypted = "";
  for (let i = 0; i < String(id).length; i++) {
    encrypted += String.fromCharCode(
      String(id).charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(encrypted);
};

export const reloadPage = () => window.location.reload();

export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}-${month}-${year}`;
};

export const formatData = (data) => {
  if (!data || data?.length === 0) return {};

  let total = 0;
  let totalData = [];
  let totalIncome = 0;
  let totalExpense = 0;
  let incomeDataMap = {};
  let expenseDataMap = {};

  // Update Income & Expense
  data.forEach((item) => {
    const [date, type, category, amount] = item;

    // Income
    if (type?.toLowerCase() === "kirim") {
      totalIncome += amount;

      if (incomeDataMap[category]) {
        incomeDataMap[category].value += amount;
      } else {
        incomeDataMap[category] = {
          id: category,
          value: amount,
          label: category,
        };
      }
    }

    // Expense
    else {
      totalExpense += amount;

      if (expenseDataMap[category]) {
        expenseDataMap[category].value += amount;
      } else {
        expenseDataMap[category] = {
          id: category,
          value: amount,
          label: category,
        };
      }
    }
  });

  // Update total & Total data
  total = totalIncome - totalExpense;
  totalData = [
    { id: "Kirim", label: "Kirim", value: totalIncome },
    { id: "Chiqim", label: "Chiqim", value: totalExpense },
  ];

  return {
    total,
    data: totalData,
    income: { total: totalIncome, data: Object.values(incomeDataMap) },
    expense: { total: totalExpense, data: Object.values(expenseDataMap) },
  };
};
