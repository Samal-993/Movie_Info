import { configureStore } from '@reduxjs/toolkit'
import movieReducere from '../store/reducers/movieSlice'
import tvReducer from '../store/reducers/tvSlice'
import personReducer from '../store/reducers/personSlice'

const Store = configureStore({
    reducer: {
        movie:movieReducere,
        tv:tvReducer,
        person:personReducer
    }
})

export default Store
