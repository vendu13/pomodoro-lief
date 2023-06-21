import React from "react";
import {Bar} from "react-chartjs-2";
import styles from './AnalyticsDashboard.module.css'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, registerables} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useUser} from "@auth0/nextjs-auth0/client";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(...registerables);

const AnalyticsDashboard = ({tasks}) => {

    const {user} = useUser();

    // Calculate completed tasks ratio
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const completedRatio =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


    // Prepare chart data
    const chartData = {
        labels: ["Completed Ratio %"],
        datasets: [
            {
                label: "Analytics",
                data: [completedRatio],
                backgroundColor: ["#ffedc2"],
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    // Calculate pomodoro
    const pomodoroData = tasks.map(el => el.tomatoes).filter(el => el > 0);
    const titles = tasks.filter(el => el.tomatoes > 0).map(el => el.title);

    // Pie Chart options

    const data = {
        labels: titles,
        datasets: [
            {
                label: '№ of tomatos',
                data: pomodoroData,
                backgroundColor: [
                    "#ffedc2",
                    "#ffe3a3",
                    "#ffda85",
                    "#ffd166",
                    "#cca752",
                    "#997d3d",
                ],
                borderColor: [
                    "#645c4b",
                    "#675c41",
                    "#574b2e",
                    "#574823",
                    "#493c1c",
                    "#483b1d",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            {user
                ?
                <div className={styles.analytics}>
                    <div className={styles.barChart}>
                        <h2>Analytics Dashboard</h2>
                        <Bar data={chartData} options={chartOptions}/>
                    </div>
                    <div className={styles.pieChart}>
                        <h2>Pomodoro Dashboard</h2>
                        <Doughnut data={data}/>
                    </div>
                </div>
                :
                <h2>Please log in to see statistics</h2>
            }
        </div>
    );
};

export default AnalyticsDashboard;
