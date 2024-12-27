import React from "react"

const Dashboard = () => {
    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap:"10px"}}>
            <NavBar />
            <CryptoChart/>
            <NewsFeed />
            <AlertModal />
        </div>
    );
};

export default Dashboard; 