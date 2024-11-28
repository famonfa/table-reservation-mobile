import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from './restaurantSlice';

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface Reservation {
  id: string;
  reservationTime: string;
  reservationDate: string;
  partySize: number;
  status: ReservationStatus;
  user: {
    name: string;
    phone: string;
  };
  table: {
    number: number;
  };
}

export interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

export const fetchReservationsByDate = createAsyncThunk(
  'reservations/fetchByDate',
  async ({ restaurantId, date }: { restaurantId: string; date: string }, { rejectWithValue }) => {
    try {
      const url = `${API_BASE_URL}/api/reservations/byDate/${restaurantId}?date=${date}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Reservation[] = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

export const createReservation = createAsyncThunk(
  'reservations/create',
  async (
    {
      restaurantId,
      tableId,
      userId,
      date,
      time,
    }: {
      restaurantId: string;
      tableId: string;
      userId: string;
      date: string;
      time: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const url = `${API_BASE_URL}/api/reservations`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId,
          tableId,
          userId,
          reservationDate: date,
          reservationTime: time,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Reservation = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    clearReservations: (state) => {
      state.reservations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reservations
      .addCase(fetchReservationsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservationsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Reservation
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReservations } = reservationSlice.actions;
export default reservationSlice.reducer;