import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { MainContext } from "../Context/ChartInfoContext";
import useAxios from "../Hooks/Api/UseAxios";

const renderCustomizedLabel = ({ x, y, width, value }) => {
  const radius = 10;
  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#DBA514" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {value.split(" ")[0]}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 p-2 rounded shadow text-yellow-900">
        <p className="font-semibold text-sm">{label}</p>
        <p>
          Cost:{" "}
          <span className="font-bold text-yellow-700">
            ${payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const Monthlysalescostcharts = () => {
  const [data, setData] = useState([]);
  const { selectdate } = useContext(MainContext);
  const Axios = useAxios();

  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;

  useEffect(() => {
    const fetchMonthlyCostData = async () => {
      const dateObj = selectdate ? new Date(selectdate) : new Date();
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const fullDate = `${year}-${month}-01`;

      try {
        const res = await Axios.get(
          `/api/dashboard/bar/products/total-cost-month-statistics-chart?date=${fullDate}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const transformed =
          res.data?.data?.map((item) => ({
            name: item.day,
            revenue: item.total_cost,
          })) || [];

        setData(transformed);
      } catch (err) {
        console.error("Failed to fetch monthly cost data:", err);
      }
    };

    fetchMonthlyCostData();
  }, [selectdate, token]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[400px] sm:min-w-full">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="revenue" fill="#DBA514" minPointSize={10}>
              <LabelList dataKey="name" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Monthlysalescostcharts;
