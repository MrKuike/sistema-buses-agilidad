'use client';
import RoadSelector from './components/roadSelector';
import BusSelector from './components/busSelector';
import styles from './page.module.css';
import { useState } from 'react';

const steps = [
	{
		name: 'Seleccionar autobus',
		component: <BusSelector />,
	},
	{
		name: 'Seleccionar ruta',
		component: <RoadSelector />,
	},
];

export default function BussesPage() {
	const [currentStep, setCurrentStep] = useState(0);

	const handleStepChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		const step = +(event.target as HTMLButtonElement).value;
		setCurrentStep(step);
	};

	const currentStepComponent = steps[currentStep].component;

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
					<button className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'>
						Volver
					</button>
				)}
				<button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
					Continuar
				</button>
			</div>
		</section>
	);
}
