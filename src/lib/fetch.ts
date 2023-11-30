'use server';
import { Busses } from '@/types';
import bussesArray from './busses.json';

// export const getBusses = async () => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/busses`, {cache: 'no-cache'});
//   if(response.status === 404) {
//     return [];
//   }
//   const data = await response.json();
//   return data as Busses[];
// };
export const getBusses = () => {
  return bussesArray as Busses[];
};

// export const getBus = async (id: string) => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/busses/${id}`, {cache: 'no-cache'});
//   if (response.status === 404) {
//     return null;
//   }
//   const data = await response.json();
//   return data as Busses;
// }

export const getBus = (id: string) => {
  const bus = bussesArray.find((bus) => bus.id === id);
  return bus as Busses;
};
