import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "./restaurantSlice";

interface Table {
  id: string;
  number: number;
  capacity: number;
  availableHours: string[];
  restaurant?: {
    name: string;
  };
}

interface TableState {
  tables: Table[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  tables: [],
  loading: false,
  error: null,
};

export const fetchTables = createAsyncThunk(
  "tables/fetchTables",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tables?restaurantId=${restaurantId}`
      );
      if (!response.ok) throw new Error("Failed to fetch tables");
      return response.json();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch tables"
      );
    }
  }
);

export const addTable = createAsyncThunk(
  "tables/addTable",
  async (
    tableData: {
      number: number;
      capacity: number;
      restaurantId: string;
      availableHours: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tables`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tableData),
      });
      if (!response.ok) throw new Error("Failed to add table");
      return response.json();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to add table"
      );
    }
  }
);

export const removeTable = createAsyncThunk(
  "tables/removeTable",
  async (tableId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tables/${tableId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove table");
      return tableId;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to remove table"
      );
    }
  }
);

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTable.fulfilled, (state, action) => {
        state.tables.push(action.payload);
      })
      .addCase(removeTable.fulfilled, (state, action) => {
        state.tables = state.tables.filter(
          (table) => table.id !== action.payload
        );
      });
  },
});

export default tableSlice.reducer;
