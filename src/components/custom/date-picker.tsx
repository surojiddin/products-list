import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover.tsx';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select.tsx';

interface DatePickerProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
    placeholder?: string;
}

export function DatePicker({ date, setDate, placeholder }: DatePickerProps) {
	const [month, setMonth] = React.useState<number>(
		date?.getMonth() || new Date().getMonth(),
	);
	const [year, setYear] = React.useState<number>(
		date?.getFullYear() || new Date().getFullYear(),
	);

	const years = React.useMemo(() => {
		const currentYear = new Date().getFullYear();
		return Array.from(
			{ length: currentYear - 1900 + 1 },
			(_, i) => currentYear - i,
		);
	}, []);

	const months = React.useMemo(() => {
		return Array.from({ length: 12 }, (_, i) => new Date(0, i));
	}, []);

	React.useEffect(() => {
		if (date) {
			setMonth(date.getMonth());
			setYear(date.getFullYear());
		}
	}, [date]);

	const handleYearChange = (selectedYear: string) => {
		const newYear = Number.parseInt(selectedYear, 10);
		setYear(newYear);
		setDate(new Date(newYear, month, 1));
	};

	const handleMonthChange = (selectedMonth: string) => {
		const newMonth = Number.parseInt(selectedMonth, 10);
		setMonth(newMonth);
		setDate(new Date(year, newMonth, 1));
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={`w-full justify-start text-left ${!date ? 'text-muted-foreground' : ''}`}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, 'dd/MM/yyyy') : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0" align="start">
				<div className="flex justify-between p-2 space-x-1">
					<Select
						onValueChange={handleYearChange}
						value={year.toString()}
						aria-label="Select Year"
					>
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Year" />
						</SelectTrigger>
						<SelectContent>
							{years.map((y) => (
								<SelectItem key={y} value={y.toString()}>
									{y}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						onValueChange={handleMonthChange}
						value={month.toString()}
						aria-label="Select Month"
					>
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Month" />
						</SelectTrigger>
						<SelectContent>
							{months.map((m, index) => (
								<SelectItem key={index.toString()} value={index.toString()}>
									{format(m, 'MMMM')}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					month={new Date(year, month)}
					onMonthChange={(newMonth) => {
						setMonth(newMonth.getMonth());
						setYear(newMonth.getFullYear());
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
