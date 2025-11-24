import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import type { Table as TanstackTable } from '@tanstack/react-table';
import {
	ChevronFirst,
	ChevronLast,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

interface PaginatorProps<TData> {
	table: TanstackTable<TData>;
}
export default function Paginator<TData>({ table }: PaginatorProps<TData>) {
	const { pageIndex } = table.getState().pagination;
	const pageCount = table.getPageCount();
	const totalItems = table.getRowCount();

	const pages = (() => {
		if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i);

		const visiblePages = new Set<number>([
			0,
			1,
			pageIndex - 1,
			pageIndex,
			pageIndex + 1,
			pageCount - 2,
			pageCount - 1,
		]);

		return Array.from(visiblePages).filter(
			(page) => page >= 0 && page < pageCount,
		);
	})();

	return (
		<div className="flex items-center justify-between w-full">
			<div className="text-sm flex font-medium space-x-2">
				<span>Jami:</span>
                <span> {totalItems}</span>
			</div>
			<Pagination className="mt-2 flex justify-end">
				<PaginationContent>
					<PaginationItem>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
							aria-label="Go to first page"
						>
							<ChevronFirst className="h-4 w-4" />
						</Button>
					</PaginationItem>

					<PaginationItem>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							aria-label="Go to previous page"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
					</PaginationItem>

					{pages.map((page, index) => (
						<div className="flex items-center justify-center" key={page}>
							{index > 0 && pages[index - 1] !== page - 1 && (
								<PaginationItem key={`ellipsis-${page}`}>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationLink
									isActive={page === pageIndex}
									onClick={() => table.setPageIndex(page)}
								>
									{page + 1}
								</PaginationLink>
							</PaginationItem>
						</div>
					))}

					<PaginationItem>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							aria-label="Go to next page"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</PaginationItem>

					<PaginationItem>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => table.setPageIndex(pageCount - 1)}
							disabled={!table.getCanNextPage()}
							aria-label="Go to last page"
						>
							<ChevronLast className="h-4 w-4" />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
