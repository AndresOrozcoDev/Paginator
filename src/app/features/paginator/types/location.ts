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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Alias específicos para tipado más claro
export type StatesResponse = ApiResponse<State[]>;
export type CitiesResponse = ApiResponse<City[]>;