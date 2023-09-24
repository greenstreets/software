import logo from "../images/logo.svg";
import "../css/home.css";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import React, { useState, useEffect } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TestChart from "../components/testChart.js";
import { Card } from "antd";

function Home() {
    console.log("home");
    const signOut = useSignOut();
    const navigate = useNavigate();
    const logout = () => {
        signOut();
        navigate("/");
    };
    const orgId = "12345";
    function getCurrentDateInISOFormat() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const day = String(currentDate.getDate()).padStart(2, "0");
        const isoDate = `${year}-${month}-${day}`;

        return isoDate;
    }
    const [cameraCount, setCameraCount] = useState("");
    const [trashCount, setTrashCount] = useState("");
    const [cleanerCount, setCleanerCount] = useState("");
    const [jobsScheduled, setJobsScheduled] = useState("");
    const [jobsProgress, setJobsProgress] = useState("");
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/getCamera",
                    {
                        method: "GET",
                        headers: {
                            orgID: `${orgId}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data.cameraCount);
                setCameraCount(data.cameraCount);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/trashCount",
                    {
                        method: "GET",
                        headers: {
                            dates: `${getCurrentDateInISOFormat()}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data.itemCount);
                setTrashCount(data.itemCount);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/getCleaners",
                    {
                        method: "GET",
                        headers: {
                            orgID: `${orgId}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data.cleanerCount);
                setCleanerCount(data.cleanerCount);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/getJobsScheduled",
                    {
                        method: "GET",
                        headers: {
                            orgID: `${orgId}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data.jobCount);
                setJobsScheduled(data.jobCount);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/getJobsProgress",
                    {
                        method: "GET",
                        headers: {
                            orgID: `${orgId}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data.jobCount);
                setJobsProgress(data.jobCount);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    async function test() {
        const accessToken = Cookies.get("_auth");
        console.log(accessToken);
        const response = await fetch("http://localhost:8000/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="App">
                <header className="App-header">
                    <div className="dashboardTop">
                        <div className="card">
                            <p>
                                Number of Jobs
                                <br />
                                in Progress
                            </p>
                            <p>{jobsProgress}</p>
                        </div>
                        <div className="card">
                            <p>
                                Number of Jobs <br />
                                Scheduled
                            </p>
                            <p>{jobsScheduled}</p>
                        </div>
                        <div className="card">
                            <p>Number of Cleaners</p>
                            <p>{cleanerCount}</p>
                        </div>
                        <div className="card">
                            <p>
                                Total Number of
                                <br />
                                Trash Collected
                            </p>
                            <p>{trashCount}</p>
                        </div>
                        <div className="card">
                            <p>Number of Cameras</p>
                            <p>{cameraCount}</p>
                        </div>
                    </div>
                    <TestChart />
                    <button onClick={logout}>Logout</button>
                    <button onClick={test}>Test</button>
                </header>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
