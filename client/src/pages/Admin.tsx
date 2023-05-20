import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import BasicModal from '../components/modals/BasicModal';
import CreateDeviceModal from '../components/modals/CreateDeviceModal';

type BasicModalVisibleState = {
   isVisible: boolean;
   type: 'type' | 'brand';
};

const Admin = () => {
   const [basicModalVisible, setBasicModalVisible] = useState<BasicModalVisibleState>({
      isVisible: false,
      type: 'brand',
   });
   const [deviceModalVisible, setDeviceModalVisible] = useState(false);

   return (
      <Container className="d-flex flex-column">
         <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            onClick={() => setBasicModalVisible({ type: 'type', isVisible: true })}>
            Добавить тип
         </Button>
         <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            onClick={() => setBasicModalVisible({ type: 'brand', isVisible: true })}>
            Добавить бренд
         </Button>
         <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            onClick={() => setDeviceModalVisible(true)}>
            Добавить устройство
         </Button>

         <BasicModal
            show={basicModalVisible.isVisible}
            onHide={() => setBasicModalVisible((prev) => ({ ...prev, isVisible: false }))}
            type={basicModalVisible.type}
         />
         <CreateDeviceModal show={deviceModalVisible} onHide={() => setDeviceModalVisible(false)} />
      </Container>
   );
};

export default Admin;
