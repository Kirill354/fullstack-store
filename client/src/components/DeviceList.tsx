import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
   const device = useSelector((state: RootState) => state.device);

   return (
      <div className="d-flex flex-wrap">
         {device.devices.map((item) => (
            <DeviceItem key={item.id} device={item} />
         ))}
      </div>
   );
};

export default DeviceList;
