import React, { useEffect, useRef } from 'react';
// import Tabulator from 'tabulator-tables'; // Import Tabulator
import { Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';


const TabulatorTable = ({ data }) => {
    const tabulatorRef = useRef(null);

    useEffect(() => {
        new Tabulator(tabulatorRef.current, {
            data: data,
            layout: "fitColumns",
            autoColumns:true,
            // columns: [
            //     { title: "DEAL_ID", field: "DEAL_ID" },
            //     { title: "DEAL_DATE_CREATE", field: "DEAL_DATE_CREATE" },
            //     { title: "DEAL_SUMM", field: "DEAL_SUMM" },
            //     { title: "DEAL_ENDED", field: "DEAL_ENDED" },
            //     { title: "COMPANY_ID", field: "COMPANY_ID" },
            //     { title: "CONTACT_ID", field: "CONTACT_ID" }
            // ],
        });
    }, [data]);

    return <div ref={tabulatorRef} />;
};

export default TabulatorTable;
