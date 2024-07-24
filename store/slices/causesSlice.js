import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    selectedCauses: [],
    causes: [],
    loading: false,
    error: null,
    userData: {
        name: "",
        email: "",
    },
};

export const fetchData = createAsyncThunk(
    "causes/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://dev.api.bono.so/v1/charity/causes"
            );
            if (!response.ok) {
                throw new Error("Something wrong with connection to API");
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const causesSlice = createSlice({
    name: "causes",
    initialState,
    reducers: {
        setSelectedCauses: (state, action) => {
            state.selectedCauses = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.causes = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedCauses, setUserData } = causesSlice.actions;
export default causesSlice.reducer;
