import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
    "seller/get_seller_request",
    async ({ parPage, page, searchValue }, { rejectWithValue, signal }) => {
        try {
            const { data } = await api.get(`/admin/get-seller-request`, {
                params: { page, searchValue, parPage },
                signal
            });
            return data;
        } catch (error) {
            if (error.name === 'AbortError') return null;
            return rejectWithValue(error.response?.data || { error: "Failed to fetch" });
        }
    }
);

export const get_seller = createAsyncThunk(
    "seller/get_seller",
    async (sellerId, { rejectWithValue, signal }) => {
        try {
            const { data } = await api.get(`/admin/get-seller/${sellerId}`, { signal });
            return data;
        } catch (error) {
            if (error.name === 'AbortError') return null;
            return rejectWithValue(error.response?.data || { error: "Seller not found" });
        }
    }
);

export const seller_status_update = createAsyncThunk(
    "seller/seller_status_update",
    async (info, { rejectWithValue, signal }) => {
        try {
            const { data } = await api.post(`/admin/seller-status-update`, info, { signal });
            return data;
        } catch (error) {
            if (error.name === 'AbortError') return null;
            return rejectWithValue(error.response?.data || { error: "Update failed" });
        }
    }
);

export const sellerSlice = createSlice({
    name: "seller",
    initialState: {
        loader: false,
        sellers: [],
        totalSeller: 0,
        seller: null,
        errorMessage: "",
        successMessage: "",
        lastParams: null
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        resetSellers: (state) => {
            state.sellers = [];
            state.totalSeller = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL REQUESTS
            .addCase(get_seller_request.pending, (state, action) => {
                state.loader = true;
                const params = action.meta.arg;
                if (JSON.stringify(state.lastParams) !== JSON.stringify(params)) {
                    state.sellers = [];
                }
            })
            .addCase(get_seller_request.fulfilled, (state, action) => {
                state.loader = false;
                state.lastParams = action.meta.arg;
                state.sellers = action.payload.sellers || [];
                state.totalSeller = action.payload.totalSeller || 0;
            })
            // GET SINGLE SELLER
            .addCase(get_seller.fulfilled, (state, action) => {
                state.loader = false;
                state.seller = action.payload?.seller || null;
            })
            // STATUS UPDATE
            .addCase(seller_status_update.fulfilled, (state, action) => {
                state.loader = false;
                state.successMessage = action.payload?.message || "Status updated successfully";
                const index = state.sellers.findIndex(s => s._id === action.payload.seller?._id);
                if (index !== -1) {
                    state.sellers[index] = action.payload.seller;
                }
                state.seller = action.payload.seller;
            })
            // ERROR HANDLER
            .addMatcher(
                (action) => action.type.endsWith("/rejected") && action.payload !== null,
                (state, action) => {
                    state.loader = false;
                    state.errorMessage = action.payload?.error || action.payload?.message || "Operation failed";
                }
            );
    },
});

export const { messageClear, resetSellers } = sellerSlice.actions;
export default sellerSlice.reducer;