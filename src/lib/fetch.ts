import { Busses, Driver, Road } from '@/types';
import bussesArray from './busses.json';
import driversArray from './drivers.json';
import roadsArray from './roads.json';

// export const getBusses = () => {
//   return bussesArray as Busses[];
// };


// export const getBus = (id: string) => {
//   const bus = bussesArray.find((bus) => bus.id === id);
//   return bus as Busses;
// };

export const getDrivers = () => {
  return driversArray as Driver[];
};

export const getRoads = () => {
   return roadsArray as Road[];
};