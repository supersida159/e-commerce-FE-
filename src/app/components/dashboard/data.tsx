import { IconType } from 'react-icons';
import Heading from '../Heading/heading';

interface Props {
  data: number;
  change: number;
  isIncreate: boolean;
  icon: IconType;
  label: string;
}
const DashboardComponent: React.FC<Props> = ({
  data,
  change,
  isIncreate,
  icon: Icon,
  label
}) => {
  return (
    <div className=" rounded-rb-lg mx-3 flex flex-row items-center justify-center rounded-md rounded-br-3xl rounded-tl-3xl border bg-sky-300">
      <div className="mr-3 rounded-full bg-white p-3">
        <Icon size={60} />
      </div>

      <div className="flex-col ">
        <Heading titlle={`Total ${label}:`} />
        <Heading titlle={(label === 'Order' ? '' : '$') + data.toString()} />
        <div
          className={`text-lg ${isIncreate ? 'text-green-500' : 'text-red-500'}`}
        >
          {isIncreate ? '↑' : '↓'} {change}%
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
