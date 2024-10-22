import { useMemo } from "react";

// Chart
import { ResponsivePie } from "@nivo/pie";

// Colors data
import chartColors from "../data/chartColors";

// Define the custom legend component
const CustomLegend = ({ data, colors }) => {
  return (
    <div className="flex flex-col gap-3.5">
      {data.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3.5">
          <div className="flex items-center gap-3.5">
            {/* Legend color box */}
            <span
              className="inline-block size-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />

            {/* Legend label */}
            <span className="font-bold">{item.label}</span>
          </div>

          {/* Line */}
          <span
            className="grow h-0.5 rounded-full opacity-30"
            style={{ backgroundColor: colors[index] }}
          />

          <p>{item.value.toLocaleString()} so'm</p>
        </div>
      ))}
    </div>
  );
};

const PieChart = ({ data, className = "" }) => {
  // Use the same color scheme as the chart for legends
  const colors = useMemo(() => chartColors, []);

  return (
    <div className={`w-full h-auto overflow-x-hidden space-y-5 ${className}`}>
      <div className="w-full h-96">
        <ResponsivePie
          data={data}
          padAngle={1}
          colors={colors}
          cornerRadius={8}
          innerRadius={0.4}
          arcLinkLabel={false}
          arcLabelsSkipAngle={40}
          enableArcLinkLabels={false}
          activeOuterRadiusOffset={4}
          margin={{ bottom: 10, left: 10, right: 10, top: 10 }}
        />
      </div>

      {/* Render the custom legend */}
      <CustomLegend data={data} colors={colors} />
    </div>
  );
};

export default PieChart;
