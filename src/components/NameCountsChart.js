// components/NameCountsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const NameCountsChart = ({ data }) => {
    const labels = Object.keys(data);
    const dataValues = Object.values(data);
    // Выбираем первые 10 ключей
    const first10Labels = labels.slice(0, 10);

    // Выбираем первые 10 значений из data
    const first10Data = {};
    first10Labels.forEach(label => {
        first10Data[label] = data[label];
    });
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Что часто меняют'
            }
        }
    };

    const nameCounts = {
        first10Labels,
        datasets: [{
            label: 'Количество',
            data: first10Data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
    };

    return <Bar options={options} data={nameCounts} />;
};

export default NameCountsChart;