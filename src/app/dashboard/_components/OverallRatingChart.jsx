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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/api/v1/dashboard/interview/overallrating",
          { userId }
        );

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
        console.error("Error fetching chart data", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {chartData ? (
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
      ) : (
        <p>
          <Loader />
        </p>
      )}
    </div>
  );
};

export default OverallRatingChart;
