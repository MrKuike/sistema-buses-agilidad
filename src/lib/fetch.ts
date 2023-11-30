import { Busses } from "@/types";

export const getBusses = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/busses`, {cache: 'no-cache'});
  const data = await response.json();
  return data as Busses[];
};

export const getBus = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/busses/${id}`, {cache: 'no-cache'});
  const data = await response.json();
  return data as Busses;
}