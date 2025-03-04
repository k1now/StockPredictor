import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import stockImage from "./image.webp"; // Background stock image

const StockReportChatbot = () => {
    console.log("✅ StockReportChatbot Component Loaded! Rendering UI...");
    const [tickers, setTickers] = useState([]);
    const [currentTicker, setCurrentTicker] = useState("");
    const [report, setReport] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddTicker = () => {
        if (currentTicker.trim() !== "" && tickers.length < 3) {
            setTickers([...tickers, currentTicker.trim().toUpperCase()]);
            setCurrentTicker("");
        }
    };

    const handleGenerateReport = async () => {
        setLoading(true);
        setReport("");

        console.log("Generating report for:", tickers);

        try {
            const response = await fetch("http://localhost:4000/api/stock-analysis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tickers }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch stock report");
            }

            const data = await response.json();
            setReport(data.report);
        } catch (error) {
            console.error("Error generating stock report:", error);
            setReport("❌ Error fetching stock data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${stockImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh", // Full-page background
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <Card
                style={{
                    position: "relative",
                    background: "rgba(255, 255, 255, 0.08)", // Transparent
                    backdropFilter: "blur(12px)", // Soft blur effect
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    padding: "20px",
                    width: "40%", // Adjusted size
                    color: "white",
                    maxHeight: "80vh", // Prevents card from being too tall
                    overflow: "hidden", // Ensures no weird cut-offs
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Stripe Background for Texts */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
                        borderRadius: "12px",
                        zIndex: 1, // Keeps it behind the text
                    }}
                />

                <Card.Header
                    className="text-center bg-transparent text-white"
                    style={{ position: "relative", zIndex: 2 }}
                >
                    <h2>Stock Report Chatbot</h2>
                </Card.Header>

                {/* Scrollable Content Wrapper */}
                <div
                    style={{
                        overflowY: "auto", // Enables scrolling if content is too long
                        flexGrow: 1, // Ensures it takes up all available space
                        paddingRight: "10px", // Prevents scrollbar from overlapping text
                    }}
                >
                    <Card.Body style={{ position: "relative", zIndex: 2 }}>
                        <p className="text-center" style={{ color: "white" }}>
                            <strong>Add up to 3 stock tickers below to get a stock report.</strong>
                        </p>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter stock symbol (e.g., AAPL)"
                                    value={currentTicker}
                                    onChange={(e) => setCurrentTicker(e.target.value)}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        border: "1px solid rgba(255, 255, 255, 0.4)",
                                        color: "white",
                                    }}
                                />
                                <Button
                                    className="mt-2"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        border: "1px solid rgba(255, 255, 255, 0.4)",
                                        color: "black",
                                    }}
                                    onClick={handleAddTicker}
                                    disabled={tickers.length >= 3 || currentTicker.trim() === ""}
                                >
                                    + Add
                                </Button>
                            </Form.Group>
                        </Form>

                        <div className="mb-3">
                            <h5>Your Selected Stocks:</h5>
                            <ul>
                                {tickers.length === 0 ? (
                                    <p>No stocks added yet.</p>
                                ) : (
                                    tickers.map((ticker, index) => <li key={index}>{ticker}</li>)
                                )}
                            </ul>
                        </div>

                        <Button
                            variant="success"
                            onClick={handleGenerateReport}
                            disabled={tickers.length === 0 || loading}
                        >
                            {loading ? "Generating Report..." : "Generate Report"}
                        </Button>

                        <div className="mt-4">
                            <h5>📊 Stock Report</h5>
                            <div
                                style={{
                                    maxHeight: "250px", // Ensures report doesn’t stretch card
                                    overflowY: "auto", // Scrollable if long text
                                    padding: "10px",
                                    background: "rgba(0, 0, 0, 0.4)", // Slightly darker background for readability
                                    borderRadius: "8px",
                                    color: "white",
                                }}
                            >
                                {loading ? <p>⏳ Analyzing stock data...</p> : <p>{report}</p>}
                            </div>
                        </div>
                    </Card.Body>
                </div>
            </Card>
        </div>
    );
};

export default StockReportChatbot;
