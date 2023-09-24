import React from "react";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { Card } from "antd";

function TestChart() {
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const initialMonths = "3"; // Initial selection
    const [selectedMonths, setSelectedMonths] = useState(initialMonths);
    const [selectedMonthsPie, setSelectedMonthsPie] = useState(initialMonths);
    const [pieValues, setPieValues] = useState([]);
    const handleSelectChange = (event) => {
        setSelectedMonths(event.target.value);
    };
    const handleSelectChangePie = (event) => {
        setSelectedMonthsPie(event.target.value);
    };
    function getCurrentDateInISOFormat() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const day = String(currentDate.getDate()).padStart(2, "0");
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

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/databasePie",
                    {
                        method: "GET",
                        headers: {
                            dates: `${getCurrentDateInISOFormat()}`,
                            time: `${selectedMonthsPie}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
                setPieValues(data.map((percentage) => parseFloat(percentage)));
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [selectedMonthsPie]);
    const chartOptions = {
        //colors: ["#000000"],
        grid: {
            borderColor: "#000000", // Set the color of the horizontal grid lines to black
        },
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
                    colors: "black",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "black",
                },
            },
        },
    };

    const yAxis = [
        {
            name: "Number of trash collected",
            data: yValues,
        },
    ];
    const chartOptionsPie = {
        labels: ["Category A", "Category B", "Category C"],
        colors: ["#FF5733", "#FFC300", "#33FF57"],
        legend: {
            show: true,
        },
    };

    return (
        <div className="dashbaordGraphContainer">
            <div className="dashboardChart">
                <div className="Chartcard">
                    <h2>Number of Trash Collected</h2>
                    <select
                        value={selectedMonths}
                        onChange={handleSelectChange}
                    >
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                    </select>
                    <Chart
                        options={chartOptions}
                        series={yAxis}
                        type="bar"
                        width="450"
                    />
                </div>
            </div>
            <div className="dashboardChart">
                <div className="Chartcard">
                    <h2>Trash Category</h2>
                    <select
                        value={selectedMonthsPie}
                        onChange={handleSelectChangePie}
                    >
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                    </select>
                    <Chart
                        options={chartOptionsPie}
                        series={pieValues}
                        type="pie"
                        width="400"
                    />
                </div>
            </div>
        </div>
    );
}

export default TestChart;
