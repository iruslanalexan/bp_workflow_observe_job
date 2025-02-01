// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';

const useFetchData = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hostUrl = process.env.REACT_APP_HOST_URL;

    const fetchData = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка загрузки данных...');

            const data = await response.json();
            setDashboardData(data.dashboard);
            setError(null);
        } catch (err) {
            // Проверяем, относится ли URL к основному ресурсу
            if (url.startsWith('http')) {
                try {
                    // Пробуем загрузить локальный файл
                    const localResponse = await fetch('/data_big.json');
                    if (!localResponse.ok) throw new Error('Локальные данные недоступны...');
                    const localData = await localResponse.json();
                    setDashboardData(localData.dashboard);
                    setError(null);
                } catch (localErr) {
                    setError(localErr.message);
                    setDashboardData(null);
                }
            } else {
                setError(err.message);
                setDashboardData(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_HOST_URL}/dboard/observe/point/?d=data_big.json`);
    }, []);

    const fetchDataAllDay = () => {
        fetchData(`${process.env.REACT_APP_HOST_URL}/dboard/observe/point/?d=data_big.json`);
    };

    const fetchData3day = () => {
        fetchData(`${process.env.REACT_APP_HOST_URL}/dboard/observe/point/?d=data3day.json`);
    };

    return { dashboardData, loading, error, fetchDataAllDay, fetchData3day };
};

export default useFetchData;