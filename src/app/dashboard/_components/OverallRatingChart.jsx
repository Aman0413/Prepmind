"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OverallRatingChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/v1/dashboard/interview/overallrating",
          { userId }
        );

        setLoading(false);
        const { totalAnswers, averageRating } = response.data.data;
        setChartData({
          labels: ["Total Answers", "Average Rating"],
          datasets: [
            {
              label: "Interview Ratings",
              data: [totalAnswers, averageRating],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        });
      } catch (error) {
        setLoading(false);
        console.error("Error fetching chart data", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Overall Interview Ratings",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}

      {loading && <h2 className="text-gray-500">Chart is Loading....</h2>}
      {!loading && !chartData && (
        <h2 className="text-gray-500">No data available</h2>
      )}
    </div>
  );
};

export default OverallRatingChart;
