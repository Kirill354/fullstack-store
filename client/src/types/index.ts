export interface DeviceType {
   id: string;
   name: string;
}
export interface DeviceBrand {
   id: string;
   name: string;
}
interface InfoItem {
   id: number;
   title: string;
   description: string;
   deviceId: string;
}
export interface Device {
   id: string;
   name: string;
   price: number;
   rating: number;
   img: string;
   info?: InfoItem[];
}
export type DeviceInfo = {
   id: number;
   title: string;
   description: string;
};
