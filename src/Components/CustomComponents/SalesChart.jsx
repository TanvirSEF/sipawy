import { useContext, useEffect, useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { MainContext } from "../Context/ChartInfoContext";

export default function SalesChart({ className, gold = false }) {
  const { chartInfo } = useContext(MainContext);

  // Generate current month dates with simulated sales
  const generateCurrentMonthData = () => {
    const now = new Date();

    // const daysInMonth = new Date(year, month + 1, 0).getDate();

    const data = [];
    for (let day = 1; day <= now.getDate(); day++) {
      const date = new Date(day);
      const formatted = `${day} ${date.toLocaleString("en-GB", {
        month: "short",
      })}`;
      data.push({
        date: formatted,
        sales: Math.floor(Math.random() * 30000),
      });
    }
    return data;
  };

  const fallbackData = generateCurrentMonthData();

  const data = chartInfo || fallbackData;
  console.log(chartInfo);

  const maxSales = useMemo(() => {
    return Math.ceil(Math.max(...data.map((item) => item.sales)));
  }, [data]);

  const yAxisTicks = useMemo(() => {
    return Array.from({ length: maxSales + 10 }, (_, i) => i);
  }, [maxSales]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTickInterval = useMemo(() => {
    if (windowWidth < 500) return 5;
    if (windowWidth < 768) return 2;
    if (windowWidth < 1024) return 1;
    return 0;
  }, [windowWidth]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-black text-base">
            Sales:{" "}
            <span className="text-[#DBA514]">
              {payload[0].value.toLocaleString()} bottles
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full h-[380px] bg-white py-4 sm:py-0 ", className)}>
      <ChartContainer
        config={{
          sales: {
            label: "Sales",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#e5e5e5"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              axisLine={{ stroke: "#e5e5e5" }}
              tickLine={false}
              dy={5}
              interval={getTickInterval}
              tick={{ fill: "#222" }}
              style={{ fill: "#222", fontWeight: "500", fontSize: "13px" }}
            />
            <YAxis
              axisLine={{ stroke: "#e5e5e5" }}
              tickLine={false}
              ticks={yAxisTicks}
              tickFormatter={(value) => `${value}`}
              domain={[0, maxSales]}
              tick={{ fill: "#222" }}
              style={{ fill: "#222", fontWeight: "500", fontSize: "13px" }}
            />
            <ChartTooltip cursor={true} content={<CustomTooltip />} />
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="2.3%" stopColor="#DBA514" />
                <stop offset="35.25%" stopColor="#EEB609" />
                <stop offset="97.79%" stopColor="#FCC201" />
              </linearGradient>
            </defs>
            <Bar
              dataKey="sales"
              fill={gold ? "url(#goldGradient)" : "#C8C8C8"}
              radius={[4, 4, 0, 0]}
              barSize={50}
              maxBarSize={50}
            />
            <Line
              type="linear"
              dataKey="sales"
              stroke="#222"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000000", stroke: "#000000", strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: "#222",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
