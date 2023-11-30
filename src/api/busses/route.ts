import bussesArray from './busses.json';
export function GET(){
  return Response.json(bussesArray);
}