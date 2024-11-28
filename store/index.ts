import {configureStore} from '@reduxjs/toolkit'
import restaurantSlice from './restaurantSlice'
import reservationReducer from './reservationSlice';
import tableReducer from './tableSlice';


export const store = configureStore({
    reducer: {
        restaurants: restaurantSlice,
        reservations: reservationReducer,
        tables: tableReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch