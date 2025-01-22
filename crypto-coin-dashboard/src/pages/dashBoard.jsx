'use strict';

import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbarGrid from './CustomToolbar';

const Dashboard = () => {
    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap:"10px"}}>
            <DataGrid 
            {...data} loading={loading} slots={{ toolbar: CustomToolbarGrid }}
            />
        </div>
    );
};

export default Dashboard; 