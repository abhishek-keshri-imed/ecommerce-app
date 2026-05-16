import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/**
 * HELPER: decodeToken
 * Decodes JWT and validates expiration to hydrate state.
 */
const decodeToken = (token) => {
    if (!token) return null;
    try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const expireTime = decoded.exp * 1000;

        if (expireTime < Date.now()) {
            localStorage.clear();
            return null;
        }
        return decoded;
    } catch (e) {
        console.error("Token Decode Error:", e.message);
        return null;
    }
};

// --- ASYNC THUNKS ---

export const customer_register = createAsyncThunk(
    "auth/customer_register",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/register", info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: error.message });
        }
    }
);

export const admin_login = createAsyncThunk(
    "auth/admin_login",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/login", info);
            if (data.role !== "admin") {
                return rejectWithValue({ error: "Access Denied: Admin privileges required" });
            }
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: "Login Failed" });
        }
    }
);

export const customer_login = createAsyncThunk(
    "auth/customer_login",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/login", info);
            if (data.role === "admin") {
                return rejectWithValue({ error: "Please use the Admin Portal to sign in." });
            }
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: "Login Failed" });
        }
    }
);

export const forgot_password = createAsyncThunk(
    "auth/forgot_password",
    async (email, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/forgot-password", { email });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: error.message });
        }
    }
);

export const reset_password = createAsyncThunk(
    "auth/reset_password",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/reset-password", info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: error.message });
        }
    }
);

// --- SLICE ---

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loader: false,
        userInfo: decodeToken(localStorage.getItem("accessToken")),
        role: localStorage.getItem("role") || "",
        userName: localStorage.getItem("userName") || "",
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        logout: (state) => {
            state.userInfo = null;
            state.role = "";
            state.userName = "";
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            // 1. GLOBAL PENDING: Start loader for all auth actions
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loader = true;
                }
            )
            // 2. GLOBAL SUCCESS: Handle data and session storage
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, { payload, type }) => {
                    state.loader = false;
                    state.successMessage = payload.message;

                    if (payload.token) {
                        const decodedToken = decodeToken(payload.token);
                        state.userInfo = decodedToken;
                        state.role = payload.role || decodedToken?.role;
                        
                        if (payload.name) {
                            state.userName = payload.name;
                            localStorage.setItem("userName", payload.name);
                        }

                        localStorage.setItem("accessToken", payload.token);
                        localStorage.setItem("role", state.role);
                    } 
                    // Handle registration for sellers (who get no token until approved)
                    else if (type.includes("register")) {
                        state.userInfo = null;
                        state.role = "";
                    }
                }
            )
            // 3. GLOBAL REJECTED: Capture error strings
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, { payload }) => {
                    state.loader = false;
                    state.errorMessage = payload?.error || "An unexpected error occurred";
                }
            );
    },
});

export const { messageClear, logout } = authSlice.actions;
export default authSlice.reducer;