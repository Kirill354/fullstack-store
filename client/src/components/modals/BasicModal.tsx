import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createType, createBrand } from '../../services/deviceApi';

interface CreateBrandProps {
   show: boolean;
   onHide: () => void;
   type: 'brand' | 'type';
}
const CreateBrand: React.FC<CreateBrandProps> = ({ show, onHide, type }) => {
   const [value, setValue] = useState('');

   const add = () => {
      type === 'type'
         ? createType({ name: value }).then((data) => {
              setValue('');
              onHide();
           })
         : createBrand({ name: value }).then((data) => {
              setValue('');
              onHide();
           });
   };
   return (
      <Modal show={show} onHide={onHide} centered>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Добавить {type === 'brand' ? 'бренд' : 'тип'}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Control
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Введите название ${type === 'brand' ? 'бренда' : 'типа'}`}
               />
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>
               Закрыть
            </Button>
            <Button variant="outline-success" onClick={add}>
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateBrand;
