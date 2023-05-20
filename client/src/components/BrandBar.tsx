import { useSelector } from 'react-redux';
import { Card, Row } from 'react-bootstrap';

import { RootState, useAppDispatch } from '../store';
import { setSelectedBrand } from '../store/slices/deviceSlice';

const BrandBar = () => {
   const device = useSelector((state: RootState) => state.device);
   const dispatch = useAppDispatch();

   return (
      <div className="d-flex flex-wrap">
         {device.brands.map((brand) => (
            <Card
               style={{ cursor: 'pointer' }}
               key={brand.id}
               className="p-3"
               onClick={() => dispatch(setSelectedBrand(brand))}
               border={brand.id === device.selectedBrand?.id ? 'danger' : 'light'}>
               {brand.name}
            </Card>
         ))}
      </div>
   );
};

export default BrandBar;
