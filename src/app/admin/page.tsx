'use client';

import { Order } from '@/lib/type/order';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiBillLine, RiMoneyEuroCircleLine } from 'react-icons/ri';
import { getOrders } from '../actions/getProducts';
import LineChart from '../components/chart/LineChart';
import DashboardComponent from '../components/dashboard/data';

const Admin = () => {
  const router = useRouter();
  const [lineData, setLineData] = useState<number[][]>([]);
  const [pieData, setpieData] = useState<number[][]>([]);
  const [ordersNumber, setordersNumber] = useState<number>(0);
  const [orderNumber30days, setorderNumber30days] = useState<number>(0);

  const [averageOrderNumber, setaverageOrderNumber] = useState<number>(0);

  const [orderSale, setorderSale] = useState<number>(0);
  const [orderSale30days, setorderSale30days] = useState<number>(0);
  const [averageSale, setaverageSale] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token');
      if (token) {
        const res = await getOrders(token);
        if (res === 401) {
          toast.dismiss('Your login has expired. Please login again.');
          router.push('/login');
        } else if (typeof res === 'number') {
          toast.dismiss('Something went wrong. Please try again later.');
        } else {
          const currentDate = new Date();
          const priorDate = new Date(
            new Date().setDate(currentDate.getDate() - 30)
          );

          const tempLineData: number[][] = [];
          let totalsales = 0;
          let sale30days = 0;
          let totalOrderNumber = 0;
          let ordernumber30days = 0;

          for (let i = 0; i < 3; i++) {
            tempLineData.push(Array(12).fill(0));
          }
          res.data.map((order: Order) => {
            if (order.created_at) {
              const orderDate = new Date(order.created_at);
              console.log(currentDate.getFullYear(), 'order console');
              if (orderDate.getFullYear() === currentDate.getFullYear()) {
                const month = orderDate.getMonth();
                const orderTotal = order.orderTotal || 0;
                if (priorDate < orderDate && orderDate < currentDate) {
                  ordernumber30days += 1;
                }
                totalOrderNumber++;

                if (typeof order.status === 'number') {
                  switch (order.status) {
                    case 1:
                      tempLineData[0][month] =
                        tempLineData[0][month] + orderTotal;
                      break;
                    case 2 || 3:
                      tempLineData[1][month] =
                        tempLineData[1][month] + orderTotal;
                      break;
                    case 4:
                      tempLineData[2][month] =
                        tempLineData[2][month] + orderTotal;
                      totalsales += orderTotal;
                      if (priorDate < orderDate && orderDate < currentDate) {
                        sale30days += orderTotal;
                      }
                      break;
                  }
                }
              }
            }
          });
          for (let i = 0; i < 3; i++) {
            for (let j = 11; j < 12; j = j - 1) {
              if (j > currentDate.getMonth()) {
                tempLineData[i].splice(j, 1);
              } else {
                break;
              }
            }
          }
          const monthToNow =
            (currentDate.getMonth() * 30 + currentDate.getDate()) / 30;
          // set sale
          setaverageSale(totalsales / monthToNow);
          setorderSale(totalsales);
          setorderSale30days(sale30days);
          //set orderNumber
          setaverageOrderNumber(totalOrderNumber / monthToNow);
          setordersNumber(totalOrderNumber);
          setorderNumber30days(ordernumber30days);

          setLineData(tempLineData);
        }
      } else {
        router.push('/login');
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-full w-full bg-white">
      <div className="   grid h-40  grid-flow-col flex-row justify-stretch">
        <DashboardComponent
          label="Order"
          data={ordersNumber}
          change={
            averageOrderNumber > orderNumber30days
              ? 1 - orderNumber30days / averageOrderNumber
              : (orderNumber30days / averageOrderNumber - 1) * 100
          }
          isIncreate={orderNumber30days / averageOrderNumber > 1}
          icon={RiBillLine}
        />
        <DashboardComponent
          label="Sale"
          data={orderSale}
          change={
            averageSale > orderSale30days
              ? 1 - orderSale30days / averageSale
              : (orderSale30days / averageSale - 1) * 100
          }
          isIncreate={orderSale30days / averageSale > 1}
          icon={RiMoneyEuroCircleLine}
        />
      </div>
      <div>
        <LineChart data={lineData} />
      </div>
      {/* <PieChart data={pieData} /> */}
      {/* <GaugeChart /> */}
    </div>
  );
};

export default Admin;
