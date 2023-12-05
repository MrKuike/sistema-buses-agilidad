'use client';
import RoadSelector from './components/roadSelector';
import BusSelector from './components/busSelector';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Selection {
	busPlate?: string;
	routeId?: string;
}

export default function BussesPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [selection, setSelection] = useState<Selection>({});

	const steps = [
		{
			name: 'Seleccionar autobus',
			component: (
				<BusSelector
					selected={selection}
					setSelection={setSelection}
				/>
			),
		},
		{
			name: 'Seleccionar ruta',
			component: (
				<RoadSelector
					selected={selection}
					setSelection={setSelection}
				/>
			),
		},
	];

	const handleStepChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		const step = +(event.target as HTMLButtonElement).value;
		setCurrentStep(step);
	};

	const currentStepComponent = steps[currentStep].component;

	useEffect(() => {
		console.log(selection);
	}, [selection]);

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1);
		}
	};

	const nextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(prev => prev + 1);
		}
	};

	const handleAssign = async () => {
		const $assignBtn = document.querySelector('button#assignBtn') as HTMLButtonElement;
		if (selection.busPlate && selection.routeId) {
			$assignBtn.disabled = true;
			const res = await fetch('/api/busses/assign', {
				method: 'POST',
				body: JSON.stringify({ data: selection }),
			});

			if (res.ok) {
				const data = await res.json();
				toast.success(data.message);
			}
		} else {
			toast.error('Por favor, seleccione un autobus y una ruta válidos');
		}
	};

	return (
		<section className={`${styles.assign} flex-1 gap-3`}>
			<div className={`${styles.steps} border rounded`}>
				<ul className='flex flex-col h-full items-center bg-slate-300 gap-3 w-full px-2 py-4 '>
					{steps.map((step, i) => (
						<li
							key={step.name}
							className={`text-center text-xs md:text-base w-full`}
						>
							<button
								type='button'
								className={`w-full md:h-14 text-base md:text-sm rounded transition-colors duration-75 ${
									i === currentStep
										? 'bg-slate-400'
										: 'bg-slate-100 hover:bg-slate-200'
								}`}
								onClick={handleStepChange}
								value={i}
							>
								{step.name}
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className={`${styles.content} border`}>{currentStepComponent}</div>
			<div className={`${styles.buttons} border flex justify-end gap-3 p-4`}>
				{currentStep > 0 && (
					<button
					key={'prevBtn'}
						onClick={prevStep}
						className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
					>
						Volver
					</button>
				)}
				{currentStep < steps.length - 1 ? (
					<button
					key={'nextBtn'}
						onClick={nextStep}
						className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
					>
						Siguiente
					</button>
				) : (
					<button
					key={'assignBtn'}
						onClick={handleAssign}
						id='assignBtn'
						className='enabled:bg-blue-500 disabled:bg-blue-200  hover:enabled:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Asignar
					</button>
				)}
				{/* <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
					Continuar
				</button> */}
			</div>
		</section>
	);
}
