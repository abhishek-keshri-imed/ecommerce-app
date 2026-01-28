import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Helper to decode JWT and check expiration
const decodeToken = (token) => {
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const expireTime = decoded.exp * 1000;
      if (expireTime < Date.now()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("userName"); // Clear on logout
        return null;
      }
      return decoded;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }
  return null;
};

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/register", info);
      return fulfillWithValue(data);
    } catch (error) {
      // PROPER LOGGING: Check if response exists first
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        // This catches Network Errors / CORS / Server Down
        return rejectWithValue({ error: error.message });
      }
    }
  }
);

/**
 * ADMIN LOGIN
 * Specifically for the /admin-login page.
 * Rejects if the user is not an admin.
 */
export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/login", info);

      // Critical role check for the Admin Portal
      if (data.role !== "admin") {
        return rejectWithValue({
          error: "Access Denied: You are not an Admin",
        });
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

      // BLOCK ADMINS HERE
      if (data.role === "admin") {
        return rejectWithValue({
          error: "Admin access denied. Please use the Admin Portal to sign in.",
        });
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "Login Failed" });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    // Hydrate state from localStorage on startup
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Pending State: Start the loader
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loader = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, { payload }) => {
          state.loader = false;
          state.successMessage = payload.message;

          // 1. Log the ACTUAL response from the server to see the name
          console.log("Full Server Response:", payload);

          const decodedToken = decodeToken(payload.token);
          state.userInfo = decodedToken;

          // 2. Capture and store the name from the payload (not the token)
          if (payload.name) {
            state.userName = payload.name;
            localStorage.setItem("userName", payload.name);
          }

          const userRole = payload.role || decodedToken?.role;
          state.role = userRole;

          localStorage.setItem("accessToken", payload.token);
          localStorage.setItem("role", userRole);
        }
      )
      // 3. Error State: Capture the specific "error" string from your backend
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = payload?.error || "Operation Failed";
        }
      );
  },
});

export const { messageClear, logout } = authSlice.actions;
export default authSlice.reducer;
