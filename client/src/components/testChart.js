import React from "react";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

function TestChart() {
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const initialMonths = "3"; // Initial selection
  const [selectedMonths, setSelectedMonths] = useState(initialMonths);

  const handleSelectChange = (event) => {
    setSelectedMonths(event.target.value);
  };
  function getCurrentDateInISOFormat() {
    const currentDate = new Date();

    // Get the year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Create the ISO 8601 date string in "yyyy-mm-dd" format
    const isoDate = `${year}-${month}-${day}`;

    return isoDate;
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8000/database", {
          method: "GET",
          headers: {
            dates: `${getCurrentDateInISOFormat()}`,
            time: `${selectedMonths}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setYValues(data.map((item) => item.average_trash));
        setXValues(data.map((item) => item.date));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [selectedMonths]);
  const chartOptions = {
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
      },
    },
    xaxis: {
      categories: xValues,
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "white",
        },
      },
    },
  };

  const yAxis = [
    {
      name: "Amount of rubbish collected (kg)",
      data: yValues,
    },
  ];

  return (
    <div>
      <select value={selectedMonths} onChange={handleSelectChange}>
        <option value="3">3 months</option>
        <option value="6">6 months</option>
        <option value="12">12 months</option>
      </select>
      <Chart options={chartOptions} series={yAxis} type="bar" width="450" />
      <Chart options={chartOptions} series={yAxis} type="line" width="450" />
    </div>
  );
}

export default TestChart;
