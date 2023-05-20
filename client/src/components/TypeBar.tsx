import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

import { RootState, useAppDispatch } from '../store';
import { setSelectedType } from '../store/slices/deviceSlice';

const TypeBar = () => {
   const device = useSelector((state: RootState) => state.device);
   const dispatch = useAppDispatch();
   return (
      <ListGroup>
         {device.types.map((type) => (
            <ListGroup.Item
               style={{ cursor: 'pointer' }}
               active={type.id === device.selectedType?.id}
               onClick={() => dispatch(setSelectedType(type))}
               key={type.id}>
               {type.name}
            </ListGroup.Item>
         ))}
      </ListGroup>
   );
};

export default TypeBar;
