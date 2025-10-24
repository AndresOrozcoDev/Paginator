export interface State {
  id: string;
  state: string;
}

export interface City {
  id: number;
  city: string;
  state: string;
  state_dane_code: string;
  city_dane_code: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface CitiesResponse {
  success: boolean;
  message: string;
  data: City[];
  pagination?: Pagination;
}

export interface StatesResponse {
  success: boolean;
  message: string;
  data: State[];
}
