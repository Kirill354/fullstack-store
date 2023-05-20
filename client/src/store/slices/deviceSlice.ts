import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DeviceType, DeviceBrand, Device } from '../../types';

export interface DeviceSliceState {
   types: Array<DeviceType>;
   brands: Array<DeviceBrand>;
   devices: Array<Device>;
   selectedType: DeviceType | null;
   selectedBrand: DeviceBrand | null;
}

const initialState: DeviceSliceState = {
   types: [],
   brands: [],
   devices: [],
   selectedType: null,
   selectedBrand: null,
};

export const deviceSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setTypes: (state, action: PayloadAction<Array<DeviceType>>) => {
         state.types = action.payload;
      },
      setBrands: (state, action: PayloadAction<Array<DeviceBrand>>) => {
         state.brands = action.payload;
      },
      setDevices: (state, action: PayloadAction<Array<Device>>) => {
         state.devices = action.payload;
      },
      setSelectedType: (state, action: PayloadAction<DeviceType>) => {
         state.selectedType = action.payload;
      },
      setSelectedBrand: (state, action: PayloadAction<DeviceBrand>) => {
         state.selectedBrand = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setTypes, setBrands, setDevices, setSelectedType, setSelectedBrand } =
   deviceSlice.actions;

export default deviceSlice.reducer;
