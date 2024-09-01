import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Rectangle,
} from "recharts";

export default function Chart({ graphData }) {
  const formattedData = graphData.map((item) => ({
    date: item.date,
    price: parseFloat(item.price.replace(/[^0-9.-]+/g, "")), // Remove commas and convert to float
  }));
  return (
    <>
      <h1>Product history graph</h1>
      <div style={{ width: "90%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={formattedData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="price" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
