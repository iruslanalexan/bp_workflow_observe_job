// components/HourCountsChart.jsx

import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, // импортируем ArcElement для круговых диаграмм
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement, // регистрируем ArcElement
    Tooltip,
    Legend
);

const HourCountsChart = ({ data }) => {
    const labels = Object.keys(data).map(h => `${h}:00`);
    const dataValues = Object.values(data);

    const hourCounts = {
        labels,
        datasets: [{
            label: 'В какие часы вносятся изменения',
            data: dataValues,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ],
            hoverOffset: 4
        }]
    };

    return <Pie data={hourCounts} />;
};

export default HourCountsChart;