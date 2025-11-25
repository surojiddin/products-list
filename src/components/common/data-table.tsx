import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';

import { DataTableSkeleton } from '@/components/custom/data-table-skeleton.tsx';
import { DataTableViewOptions } from '@/components/custom/data-table-view-options.tsx';
import { SearchInput } from '@/components/custom/search-input.tsx';
import TableArea from '@/components/custom/table-area.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Suspense } from 'react';

interface DataTableProps<TData> {
	table: TanstackTable<TData>;
	isFetching: boolean;
	isSearching?: boolean;
}

export function DataTable<TData>({
	table,
	isFetching,
    isSearching,
}: DataTableProps<TData>) {
	return (
		<Suspense
			fallback={
				<DataTableSkeleton
					columnCount={table.getAllColumns().length}
					searchableColumnCount={1}
					filterableColumnCount={2}
					cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem', '8rem']}
					shrinkZero
				/>
			}
		>
			<div className="flex items-center gap-2 py-4">
				<SearchInput
					isLoading={isSearching ?? false}
					value={table.getState().globalFilter as string}
					onChange={(e) => table.setGlobalFilter(e.target.value)}
				/>
				<DataTableViewOptions table={table} />
			</div>
			<TableArea>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : isFetching ? (
							<TableRow>
								<TableCell
									align="center"
									colSpan={table.getAllColumns().length}
								>
									<Spinner className="size-6 mx-auto" />
								</TableCell>
							</TableRow>
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className="h-24 text-center"
								>
									Ma'lumot topilmadi!
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableArea>
		</Suspense>
	);
}
