import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CircleX, LoaderCircle, Search } from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';

interface SearchInputProps {
	isLoading: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
}

export const SearchInput = ({
	isLoading,
	onChange,
	placeholder,
	className,
}: SearchInputProps) => {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClearInput = () => {
		setInputValue('');
		if (inputRef.current) {
			inputRef.current.focus();
		}
		onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e);
	};

	return (
		<div className="space-y-2 w-full md:w-[350px]">
			<div className="relative">
				<Input
					ref={inputRef}
					className={cn('peer pe-9 ps-9', className)}
					placeholder={placeholder ?? 'Search...'}
					type="search"
					value={inputValue}
					onChange={handleChange}
				/>
				{inputValue && (
					<Button
						variant="link"
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Clear input"
						onClick={handleClearInput}
					>
						<CircleX size={16} strokeWidth={2} aria-hidden="true" />
					</Button>
				)}
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
					{isLoading ? (
						<LoaderCircle
							className="animate-spin"
							size={16}
							strokeWidth={2}
							role="status"
							aria-label="Loading..."
						/>
					) : (
						<Search size={16} strokeWidth={2} aria-hidden="true" />
					)}
				</div>
			</div>
		</div>
	);
};
