import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const API_BASE_URL = 'https://table-reservation-api-xabx.onrender.com';

interface RestaurantState {
    restaurants: Restaurant[];
    currentRestaurant: Restaurant | null
    loading: boolean;
    error: string | null;
    updatingFields: string[];

}

const initialState: RestaurantState = {
    restaurants: [],
    currentRestaurant: null,
    loading: false,
    error: null,
    updatingFields: [],
}

export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async (managerId: string, { rejectWithValue }) => {
        try {
            const url = `${API_BASE_URL}/api/managers/${managerId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Restaurant[] = await response.json();

            return data;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
        }
    }
);

export const addRestaurant = createAsyncThunk(
    'restaurants/addRestaurant',
    async (
      { name, address, managerId }: { name: string; address: string; managerId: string },
      { rejectWithValue }
    ) => {
      try {
        const url = `${API_BASE_URL}/api/restaurants`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            managerId: managerId,
            name: name,
            address: address,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: Restaurant = await response.json();
        return data;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

  export const fetchRestaurantByName = createAsyncThunk(
    'restaurants/fetchRestaurantByName',
    async (name: string, { rejectWithValue }) => {
      try {
        const encodedName = encodeURIComponent(name);
        const url = `${API_BASE_URL}/api/restaurants/${encodedName}`;
  
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: Restaurant = await response.json();
        return data;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

  export const updateRestaurant = createAsyncThunk(
    'restaurants/updateRestaurant',
    async ({ id, field, value }: { id: string; field: string; value: string }, { rejectWithValue }) => {
      try {
        const url = `${API_BASE_URL}/api/restaurants/${id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: value }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: Restaurant = await response.json();
        return { field, data };
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

  export const uploadRestaurantBanner = createAsyncThunk(
    'restaurants/uploadBanner',
    async ({ restaurantId, base64Image }: { restaurantId: string; base64Image: string }, { rejectWithValue }) => {
      try {
        const url = `${API_BASE_URL}/api/restaurants/${restaurantId}/banner`;
        
        // Check if base64Image already includes data URI prefix
        const imageData = base64Image.startsWith('data:') 
          ? base64Image 
          : `data:image/jpeg;base64,${base64Image}`;
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bannerImg: imageData,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRestaurants.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchRestaurants.fulfilled, (state, action) => {
            state.loading = false
            state.restaurants = action.payload
        })
        .addCase(fetchRestaurants.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(addRestaurant.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addRestaurant.fulfilled, (state, action) => {
            state.loading = false
            state.restaurants.push(action.payload)
        })
        .addCase(addRestaurant.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(fetchRestaurantByName.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchRestaurantByName.fulfilled, (state, action) => {
            state.loading = false
            state.currentRestaurant = action.payload
        })
        .addCase(fetchRestaurantByName.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(updateRestaurant.pending, (state, action) => {
          state.updatingFields.push(action.meta.arg.field);
        })
        .addCase(updateRestaurant.fulfilled, (state, action) => {
          const { field, data } = action.payload;
          state.currentRestaurant = data;
          const index = state.restaurants.findIndex(r => r.id === data.id);
          if (index !== -1) {
            state.restaurants[index] = data;
          }
          state.updatingFields = state.updatingFields.filter(f => f !== field);
        })
        .addCase(updateRestaurant.rejected, (state, action) => {
          state.error = action.payload as string;
          state.updatingFields = state.updatingFields.filter(f => f !== action.meta.arg.field);
        })
        .addCase(uploadRestaurantBanner.pending, (state) => {
          state.error = null;
          state.updatingFields.push('bannerImg');
        })
        .addCase(uploadRestaurantBanner.fulfilled, (state, action) => {
          state.updatingFields = state.updatingFields.filter(f => f !== 'bannerImg');
          if (state.currentRestaurant && action.payload) {

            state.currentRestaurant = {
              ...state.currentRestaurant,
              bannerImg: action.payload.bannerImg
            };
          }
        })
        .addCase(uploadRestaurantBanner.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    }
})

export default restaurantsSlice.reducer