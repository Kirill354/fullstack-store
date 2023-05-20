import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, Form, Row, Col } from 'react-bootstrap';

import { RootState, useAppDispatch } from '../../store';
import { setSelectedBrand, setSelectedType } from '../../store/slices/deviceSlice';
import { DeviceInfo } from '../../types';
import { createDevice } from '../../services/deviceApi';

// import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';

interface CreateDeviceModalProps {
   show: boolean;
   onHide: () => void;
}

const CreateDeviceModal: React.FC<CreateDeviceModalProps> = ({ show, onHide }) => {
   const device = useSelector((state: RootState) => state.device);
   const dispatch = useAppDispatch();

   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [file, setFile] = useState<any>(null);
   // характеристики
   const [info, setInfo] = useState<Array<DeviceInfo>>([]);

   // useEffect(() => {
   //    fetchTypes().then((data) => device.setTypes(data));
   //    fetchBrands().then((data) => device.setBrands(data));
   // }, []);

   const addInfo = () => {
      setInfo((prev) => [...prev, { title: '', description: '', id: Date.now() }]);
   };
   const removeInfo = (id: number) => {
      setInfo(info.filter((i) => i.id !== id));
   };
   const changeInfo = (key: string, value: string, id: number) => {
      setInfo(info.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
   };

   const selectFile = (e: React.ChangeEvent<any>) => {
      setFile(e.target.files[0]);
   };

   const addDevice = () => {
      if (device.selectedBrand?.id && device.selectedType?.id) {
         const formData = new FormData();
         formData.append('name', name);
         formData.append('price', `${price}`);
         formData.append('img', file);
         formData.append('brandId', device.selectedBrand.id);
         formData.append('typeId', device.selectedType.id);
         formData.append('info', JSON.stringify(info));
         createDevice(formData).then((data) => onHide());
      } else {
         alert('choose type or brand');
      }
   };

   return (
      <Modal show={show} onHide={onHide} centered>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Добавить устройство</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Dropdown className="mt-2 mb-2">
                  <Dropdown.Toggle>{device.selectedType?.name || 'Выберите тип'}</Dropdown.Toggle>
                  <Dropdown.Menu>
                     {device.types.map((type) => (
                        <Dropdown.Item
                           onClick={() => dispatch(setSelectedType(type))}
                           key={type.id}>
                           {type.name}
                        </Dropdown.Item>
                     ))}
                  </Dropdown.Menu>
               </Dropdown>
               <Dropdown className="mt-2 mb-2">
                  <Dropdown.Toggle>
                     {device.selectedBrand?.name || 'Выберите бренд'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     {device.brands.map((brand) => (
                        <Dropdown.Item
                           onClick={() => dispatch(setSelectedBrand(brand))}
                           key={brand.id}>
                           {brand.name}
                        </Dropdown.Item>
                     ))}
                  </Dropdown.Menu>
               </Dropdown>
               <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3"
                  placeholder="Введите название устройства"
               />
               <Form.Control
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-3"
                  placeholder="Введите стоимость устройства"
                  type="number"
               />
               <Form.Control className="mt-3" type="file" onChange={selectFile} />
               <hr />
               <Button variant={'outline-dark'} onClick={addInfo}>
                  Добавить новое свойство
               </Button>
               {info.map((item) => (
                  <Row className="mt-4" key={item.id}>
                     <Col md={4}>
                        <Form.Control
                           value={item.title}
                           onChange={(e) => changeInfo('title', e.target.value, item.id)}
                           placeholder="Введите название свойства"
                        />
                     </Col>
                     <Col md={4}>
                        <Form.Control
                           value={item.description}
                           onChange={(e) => changeInfo('description', e.target.value, item.id)}
                           placeholder="Введите описание свойства"
                        />
                     </Col>
                     <Col md={4}>
                        <Button onClick={() => removeInfo(item.id)} variant={'outline-danger'}>
                           Удалить
                        </Button>
                     </Col>
                  </Row>
               ))}
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>
               Закрыть
            </Button>
            <Button variant="outline-success" onClick={addDevice}>
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateDeviceModal;
