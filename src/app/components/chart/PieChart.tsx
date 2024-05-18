import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface Props {
  data: number[][];
}

const PieChart: React.FC<Props> = ({ data }: { data: number[][] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<any, number[], string> | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext('2d');

      if (!context) return; // Ensure context is available before creating the chart

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const newChart = new Chart(context, {
        type: 'pie',
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
              label: 'Completed Products sale',
              data: data[0],
              borderWidth: 3,
              borderColor: '#F5B7B1',
              backgroundColor: '#F5B7B1',
              animations: {}
            },
            {
              label: 'Pending Products sale',
              data: data[1],
              borderWidth: 3,
              borderColor: 'Blue',
              backgroundColor: 'Blue',
              animations: {}
            },
            {
              label: 'Failed Products sale',
              data: data[2],
              borderWidth: 3,
              borderColor: 'Red',
              backgroundColor: 'Red',
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
          }
        }
      });

      chartInstanceRef.current = newChart;
    }
  }, []);

  return (
    <div className="w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
