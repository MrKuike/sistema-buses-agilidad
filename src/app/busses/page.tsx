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
  }

  const currentStepComponent = steps[currentStep].component;

  return (
    <section className={`${styles.assign} h-full`}>
      <div className={`${styles.steps} border`}>
        <ul className='flex flex-col h-full items-center bg-slate-300 gap-3 w-full px-2 pt-4'>
          {steps.map((step, i) => (
            <li key={step.name} className={`text-center text-xs md:text-base w-full`}>
              <button type='button' className={`w-full text-base md:text-xl rounded transition-colors duration-75 ${i === currentStep ? 'bg-blue-500': 'bg-white hover:bg-blue-400'}`} onClick={handleStepChange} value={i}>{step.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.content} border overflow-y-scroll`}>{currentStepComponent}</div>
      <div className={`${styles.buttons} border`}>BUTTONS</div>
    </section>
  );
}
