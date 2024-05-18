'use client';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const GaugeChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext('2d');

      if (!context) return; // Ensure context is available before creating the chart

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const myChart = new Chart(context, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [30, 0 - 180],
              backgroundColor: ['#FF6384', '#DDDDDD'],
              borderWidth: 0
            }
          ]
        },
        options: {
          cutout: '180%',
          rotation: -Math.PI,
          circumference: Math.PI,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        }
      });

      return () => myChart.destroy();
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default GaugeChart;
