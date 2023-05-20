import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { BrandBar, TypeBar, DeviceList } from '../components';
import { fetchBrands, fetchDevices, fetchTypes } from '../services/deviceApi';
import { RootState, useAppDispatch } from '../store';
import { setBrands, setTypes, setDevices } from '../store/slices/deviceSlice';
import { useSelector } from 'react-redux';

const Shop = () => {
   const dispatch = useAppDispatch();
   const device = useSelector((state: RootState) => state.device);

   useEffect(() => {
      fetchTypes().then((data) => dispatch(setTypes(data)));
      fetchBrands().then((data) => dispatch(setBrands(data)));
      fetchDevices(null, null, 1).then((data) => {
         dispatch(setDevices(data.rows));
         // dispatch(setTotalCount(data.count));
      });
   }, []);

   // useEffect(() => {
   //    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then((data) => {
   //       dispatch(setDevices(data.rows));
   //       // device.setTotalCount(data.count);
   //    });
   // }, [device.page, device.selectedType, device.selectedBrand]);

   return (
      <Container>
         <Row className="mt-4">
            <Col md={3}>
               <TypeBar />
            </Col>
            <Col md={9}>
               <BrandBar />
               <DeviceList />
               {/* <Pages /> */}
            </Col>
         </Row>
      </Container>
   );
};

export default Shop;
