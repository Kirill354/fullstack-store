import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../services/deviceApi';
import { Device } from '../types';

const DevicePage = () => {
   const [device, setDevice] = useState<Device>();
   const { id } = useParams();
   useEffect(() => {
      id && fetchOneDevice(id).then((data) => setDevice(data));
   }, []);
   return (
      <Container className="mt-3">
         <Row className="mb-4">
            <Col md={6}>
               <Image width={400} height={400} src={import.meta.env.VITE_API_URL + device?.img} />
            </Col>
            <Col md={6}>
               <div
                  className="d-flex flex-column justify-content-between"
                  style={{ height: '400px' }}>
                  <div>
                     <span style={{ fontSize: '24px' }}>Rating: {device?.rating}</span>
                     <h2 className="mt-3" style={{ fontSize: '44px' }}>
                        {device?.name}
                     </h2>
                     <h3 className="mt-4" style={{ fontSize: '24px' }}>
                        От: {device?.price} руб.
                     </h3>
                  </div>

                  <Button size="lg" className="align-self-start" variant={'outline-dark'}>
                     Добавить в корзину
                  </Button>
               </div>
            </Col>
         </Row>
         <Row className="d-flex flex-column m-3">
            <h1 className="mb-3">Характеристики</h1>
            {device &&
               device.info?.map((info, index) => (
                  <Row
                     key={info.id}
                     style={{
                        background: index % 2 === 0 ? 'lightgray' : 'transparent',
                        padding: 10,
                     }}>
                     {info.title}: {info.description}
                  </Row>
               ))}
         </Row>
      </Container>
   );
};

export default DevicePage;
