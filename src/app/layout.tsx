import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './ui/header';
import Navbar from './ui/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Sistema de buses',
	icons: {icon: 'favicons/favicon.ico'},
};

export default function RootLayout(props: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es'>
			<body
				className={`${inter.className} flex flex-col md:w-4/5 h-screen mx-auto`}
			>
				<Header />
				<Navbar />
				{props.children}
				<ToastContainer />
			</body>
		</html>
	);
}
