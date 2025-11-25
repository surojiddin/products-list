import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type {Product} from "@/types/products.ts";
import {humanizeDateTime} from "@/utils/humanize.ts";
import {ArrowUpDown, ArrowUp, ArrowDown, EyeIcon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Tooltip, TooltipProvider, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Link} from "react-router";

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
				),
			},
			{
				accessorKey: 'sku',
				header: ({ column }) => (
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
				),
			},
			{
				accessorKey: 'barcode',
				header: ({ column }) => (
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
				),
			},
			{
				accessorKey: 'price',
				header: ({ column }) => (
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
				),
			},
			{
				accessorKey: 'created_at',
				header: ({ column }) => (
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
				),
				cell: ({ row }) => (
					<span className="truncate">
						{humanizeDateTime(row.original.created_at)}
					</span>
				),
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
                                    <p>Buyurtma ma'lumotlari</p>
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
