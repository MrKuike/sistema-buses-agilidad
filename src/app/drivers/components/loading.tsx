import { TailSpin } from "react-loading-icons";

export default function Loading() {
  return (
    <div className='h-full grid place-content-center'>
				<TailSpin className='stroke-slate-700 stroke-2 animate-spin' />
			</div>
  )
}
