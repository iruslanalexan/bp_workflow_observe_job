import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HourUserEventsHourChart = (inData) => {


// Исходные данные
    const data = inData.data;

// Функция для сортировки данных по часам
    const sortDataByHours = (data) => {
        const sortedData = {};

        for (const user in data) {
            const userData = data[user];

            // Преобразуем ключи (часы) в числа и сортируем их
            const sortedHours = Object.keys(userData)
                .map(Number) // Преобразуем часы в числа
                .sort((a, b) => a - b); // Сортируем по возрастанию

            // Создаем новый объект с отсортированными часами
            sortedData[user] = {};
            sortedHours.forEach(hour => {
                sortedData[user][hour] = userData[hour];
            });
        }

        return sortedData;
    };

// Применяем сортировку
    const sortedData = sortDataByHours(data);

// Формируем данные для графика
    const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Метки для всех 24 часов

    const datasets = Object.keys(sortedData).map(user => {
        const userData = sortedData[user];
        const dataForUser = labels.map(label => {
            const hour = parseInt(label.split(':')[0]); // Извлекаем час из метки
            return userData[hour] || 0; // Если данные отсутствуют, используем 0
        });

        return {
            label: `User ${user}`,
            data: dataForUser,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
        };
    });

    const chartData = {
        labels: labels, // Метки для оси X (все 24 часа)
        datasets: datasets, // Данные для каждого пользователя
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Количество правок по часам для каждого пользователя',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Час',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Количество правок',
                },
            },
        },
    };



    return <Bar data={chartData} options={options} />;
};

export default HourUserEventsHourChart;