import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface Props {
  data: number[][];
}

const LineChart: React.FC<Props> = ({ data }: { data: number[][] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  useEffect(() => {
    console.log('data:', data);
    if (chartRef.current) {
      const context = chartRef.current.getContext('2d');

      if (!context) return; // Ensure context is available before creating the chart

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const newChart = new Chart(context, {
        type: 'line',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          datasets: [
            {
              label: 'Total sales cancelled',
              data: data[0],
              borderWidth: 3,
              borderColor: '#F5B7B1',
              backgroundColor: '#F5B7B1',
              tension: 0.5,
              animations: {}
            },
            {
              label: 'Total sales pending',
              data: data[1],
              borderWidth: 3,
              borderColor: 'Blue',
              backgroundColor: 'Blue',
              tension: 0.5,
              animations: {}
            },
            {
              label: 'Total sales complete',
              data: data[2],
              borderWidth: 3,
              borderColor: 'Red',
              backgroundColor: 'Red',
              tension: 0.5,
              animations: {}
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'category'
            },
            y: {
              beginAtZero: true
            }
          },

          events: ['click', 'mousemove'],
          animation: {
            duration: 1000 // Adjust duration (milliseconds)
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || '';
                  return label + ':' + context.parsed.y + ' $';
                }
              }
            }
          }
        }
      });

      chartInstanceRef.current = newChart;
    }
  }, [data]);

  return (
    <div className="w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
