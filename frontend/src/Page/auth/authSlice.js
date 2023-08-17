import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    intitialState: { token: null},
    reducers: {
        setCredintials : (state, action) => {
        const { accessToken } = action.payload
        state.token = accessToken
        },
        logout: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredintials, logout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
