import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type {Product} from "@/types/products.ts";
import {humanizeDateTime} from "@/utils/humanize.ts";
import {ArrowUpDown, ArrowUp, ArrowDown, EyeIcon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Tooltip, TooltipProvider, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Link} from "react-router";
import {Input} from "@/components/ui/input";
import {DatePicker} from "@/components/custom/date-picker.tsx";

export const useProductColumns = (): ColumnDef<Product>[] => {

	return useMemo<ColumnDef<Product>[]>(
		() => [
			{
				header: '№',
				cell: (c) => c.row.index + 1,
				enableSorting: false,
			},
			{
				accessorKey: 'name',
				header: ({ column }) => (
					<div className="flex flex-col space-y-0.5 pb-1">
						<Button
							variant="ghost"
							onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						>
							Mahsulot nomi
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUpDown className="ml-2 h-4 w-4" />
							)}
						</Button>
						<Input
							placeholder="Nomini kiriting..."
							value={(column.getFilterValue() as string) ?? ''}
							onChange={(e) => column.setFilterValue(e.target.value || undefined)}
							className="h-8 text-xs"
						/>
					</div>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'sku',
				header: ({ column }) => (
					<div className="flex flex-col space-y-0.5 pb-1">
						<Button
							variant="ghost"
							onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						>
							SKU
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUpDown className="ml-2 h-4 w-4" />
							)}
						</Button>
						<Input
							placeholder="SKUni kiriting..."
							value={(column.getFilterValue() as string) ?? ''}
							onChange={(e) => column.setFilterValue(e.target.value || undefined)}
							className="h-8 text-xs"
						/>
					</div>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'barcode',
				header: ({ column }) => (
					<div className="flex flex-col space-y-0.5 pb-1">
						<Button
							variant="ghost"
							onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						>
							Barkod
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUpDown className="ml-2 h-4 w-4" />
							)}
						</Button>
						<Input
							placeholder="Barkodni kiriting..."
							value={(column.getFilterValue() as string) ?? ''}
							onChange={(e) => column.setFilterValue(e.target.value || undefined)}
							className="h-8 text-xs"
						/>
					</div>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'price',
				header: ({ column }) => (
					<div className="flex flex-col space-y-0.5 pb-1">
						<Button
							variant="ghost"
							onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						>
							Narxi
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUpDown className="ml-2 h-4 w-4" />
							)}
						</Button>
						<Input
							type="number"
							placeholder="Minimal narx..."
							value={(column.getFilterValue() as string) ?? ''}
							onChange={(e) => column.setFilterValue(e.target.value || undefined)}
							className="h-8 text-xs"
						/>
					</div>
				),
				enableColumnFilter: true,
				filterFn: (row, id, value) => {
					const price = row.getValue(id) as number;
					return price >= Number(value);
				},
			},
			{
				accessorKey: 'created_at',
				header: ({ column }) => (
					<div className="flex flex-col space-y-0.5 pb-1">
						<Button
							variant="ghost"
							onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						>
							Yaratilgan vaqti
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUpDown className="ml-2 h-4 w-4" />
							)}
						</Button>
						<DatePicker
							date={column.getFilterValue() ? new Date(column.getFilterValue() as string) : undefined}
							setDate={(date) => column.setFilterValue(date ? date.toISOString() : undefined)}
							placeholder="Sanani tanlang"
						/>
					</div>
				),
				cell: ({ row }) => (
					<span className="truncate">
						{humanizeDateTime(row.original.created_at)}
					</span>
				),
				enableColumnFilter: true,
				filterFn: (row, id, value) => {
					const date = new Date(row.getValue(id) as string);
					const filterDate = new Date(value);
					return date >= filterDate;
				},
			},
            {
                id: 'actions',
                header: 'Amallar',
                cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to={`/product/${row.original.id}`}>
                                        <Button
                                            aria-label="Order details"
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <EyeIcon color="blue" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mahsulot ma'lumotlari</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ),
            },
		],
		[],
	);
};
