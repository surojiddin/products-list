import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PageContainerProps {
	children: ReactNode;
	className?: string;
}

export default function TableArea({ children, className }: PageContainerProps) {
	return (
		<div
			className={cn(
				'relative w-full overflow-auto py-2.5',
				'h-[calc(100vh-19.5rem)] md:h-[calc(100vh-19)]', // Adjust height for mobile & desktop
				'max-w-screen', // Center and limit max width on larger screens
				className,
			)}
		>
			<div className="absolute w-full px-2">{children}</div>
		</div>
	);
}
