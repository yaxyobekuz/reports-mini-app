import { useMemo } from "react";

// Chart
import { ResponsivePie } from "@nivo/pie";

// Colors data
import chartColors from "../data/chartColors";

// Define the custom legend component
const CustomLegend = ({ data, colors }) => {
  return (
    <div className="flex flex-col gap-3.5">
      {data?.map((item, index) => (
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
            className="grow h-0.5 g-neutral-300 rounded-full opacity-50"
            style={{ backgroundColor: colors[index] }}
          />

          <p>{item.value.toLocaleString()} so'm</p>
        </div>
      ))}
    </div>
  );
};

const CustomPieChart = ({ data, className = "" }) => {
  const colors = useMemo(() => chartColors, []);
  return (
    <div className={`w-full h-auto space-y-5 ${className}`}>
      <div className="w-full h-96">
        {data.length > 0 ? (
          <ResponsivePie
            data={data}
            padAngle={0.8}
            colors={colors}
            cornerRadius={4}
            innerRadius={0.3}
            arcLinkLabel={false}
            arcLabelsSkipAngle={40}
            enableArcLinkLabels={false}
            activeOuterRadiusOffset={4}
            margin={{ bottom: 10, left: 10, right: 10, top: 10 }}
          />
        ) : (
          <div className="flex items-center justify-center size-full">
            <div className="flex items-center justify-center w-[calc(100%-20px)] h-auto aspect-square bg-neutral-200 rounded-full xs:w-auto xs:h-[calc(100%-20px)]">
              <div className="size-[30%] bg-[#f5f5f5] rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Render the custom legend */}
      <CustomLegend data={data} colors={colors} />
    </div>
  );
};

export default CustomPieChart;
