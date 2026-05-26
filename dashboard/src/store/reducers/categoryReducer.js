import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunk 1: Add New Category (Uses multipart/form-data for image streaming)
export const category_add = createAsyncThunk(
  "category/category_add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to create category node" },
      );
    }
  },
);

// Thunk 2: Fetch Category Taxonomy Tree Lists
export const get_categories = createAsyncThunk(
  "category/get_categories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/category-get", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch categories" },
      );
    }
  },
);

// Thunk 3: Delete Category Node by ID
export const delete_category = createAsyncThunk(
  "category/delete_category",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/category-delete/${categoryId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk 4: Update Category Node by ID (Supports optional image update)
export const update_category = createAsyncThunk(
  "category/update_category",
  async ({ categoryId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/category-update/${categoryId}`,
        formData,
        {
          withCredentials: true,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    loader: false,
    categories: [],
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Category Lifecycle Transitions
      .addCase(category_add.pending, (state) => {
        state.loader = true;
      })
      .addCase(category_add.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
        state.categories.unshift(action.payload.category); // Inserts newly created element instantly at top of array
      })
      // Fetch Categories Lifecycle Transitions
      .addCase(get_categories.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_categories.fulfilled, (state, action) => {
        state.loader = false;
        state.categories = action.payload?.categories || [];
      })
      .addCase(delete_category.fulfilled, (state, { payload, meta }) => {
        state.loader = false;
        state.successMessage = payload.message;

        const deletedId = meta.arg;
        state.categories = state.categories.filter((c) => c._id !== deletedId);
      })
      .addCase(update_category.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        // Update the specific category in the array
        const index = state.categories.findIndex(
          (c) => c._id === payload.category._id,
        );
        if (index !== -1) {
          state.categories[index] = payload.category;
        }
        state.successMessage = "Category updated successfully!";
      })
      // Universal Error Catching Matcher
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loader = false;
          state.errorMessage =
            action.payload?.error || "Network transaction error occurred";
        },
      );
  },
});

export const { messageClear } = categorySlice.actions;
export default categorySlice.reducer;
