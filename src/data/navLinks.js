import plusIcon from "../assets/images/icons/plus.svg";
import settingsIcon from "../assets/images/icons/settings.svg";
import pieChartIcon from "../assets/images/icons/pie-chart.svg";

export default {
  main: [
    {
      path: "/",
      icon: plusIcon,
      alt: "Plus icon",
      label: "Qo'shish",
    },
    {
      path: "/hisobotlar",
      icon: pieChartIcon,
      alt: "Pie Chart icon",
      label: "Hisobotlar",
    },
    {
      path: "/sozlamalar",
      icon: settingsIcon,
      alt: "Settings icon",
      label: "Sozlamalar",
    },
  ],
};
