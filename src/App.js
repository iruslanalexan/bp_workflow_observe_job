// src/App.js
import React from 'react';
import TabulatorTable from './components/TabulatorTable';
import HourCountsChart from './components/HourCountsChart';
import NameCountsChart from './components/NameCountsChart';
import HourUserEventsHourChart from "./components/HourUserEventsHourChart.js";
import useFetchData from './hooks/useFetchData';


const App = () => {
    const { dashboardData, loading, error, fetchDataAllDay, fetchData3day } = useFetchData();

    if (loading) return <div>Загрузка данных...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!dashboardData) return <div>Данные не найдены</div>;


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6" id="button_allday">
                        <button onClick={fetchDataAllDay}>Все дни</button>
                    </div>
                    <div className="col-md-6" id="button_3day">
                        <button onClick={fetchData3day}>3 дня</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12" id="tabulator">
                            <TabulatorTable data={dashboardData.last_edit_data} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5" id="pie-hour">
                            <h3>В какие часы чАще вностяся изменения</h3>
                            <HourCountsChart data={dashboardData.hour_counts} />
                        </div>
                        <div className="col-md-7" id="pie-count">
                            <NameCountsChart data={dashboardData.name_counts} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" id="pie-hour">
                            <HourUserEventsHourChart data={dashboardData.hour_user_eventshour} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;