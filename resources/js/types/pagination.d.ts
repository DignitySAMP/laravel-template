export interface LinkProps {
	active: boolean
	label: string
	page: number
	url: string
}

export interface PaginationData<T = any> {
	current_page: number
	data: T[]
	first_page_url: string
	from?: number | null
	last_page: number
	links: Array<LinkProps>
	next_page_url?: string | null
	path: string
	prev_page?: number | null
	prev_page_url?: string | null
	to?: number | null
	total?: number | null
}

// type without the data array for pagination component
export type Pagination = Omit<PaginationData, 'data'> & {
	data: Array<any>
}
