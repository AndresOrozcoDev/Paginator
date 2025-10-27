export interface City {
  city_dane_code: string;
  city: string;
  state_dane_code: string;
  state: string;
  id: string;
}

export interface State {
  id: string;
  state: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface CitiesResponse {
  status: number;
  success: boolean;
  message: string;
  totalRecords: number;
  data: City[];
  pagination: Pagination;
}

export interface StatesResponse {
  status: number;
  success: boolean;
  message: string;
  data: State[];
}

export interface CityFilters {
  state?: string;
  pageSize?: number;
  page?: number;
}
