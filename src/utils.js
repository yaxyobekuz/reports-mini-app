// Filter data by Date
export const filterByDate = (data, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return data.filter((item) => {
    const date = new Date(item[0]);
    return date >= start && date <= end;
  });
};

export const reloadPage = () => window.location.reload();
