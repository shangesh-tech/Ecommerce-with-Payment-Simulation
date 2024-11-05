import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsList: [],
  suggestionList: [],
  selectedProduct: {},
  isLoading: false,
  isSuggestionLoading:false,
  error: "",
};

const BASE_URL = "http://localhost:3500/api/v1";

//Get Search Suggestions
export const searchSuggestions = createAsyncThunk(
  "products/searchSuggestions",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search-suggestions?input=${keyword}`
      );
      return response.data.suggestions;
    } catch (error) {
      return rejectWithValue({
        error: `No Search Suggestion for this Keyword => ${keyword}`,
      });
    }
  }
);

// GET all products
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "No Products Found" });
    }
  }
);

// POST a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, product);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Product Not Added" });
    }
  }
);

// PUT (update) a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${product._id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Product Not Updated" });
    }
  }
);

// DELETE a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (product, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${product._id}`);
      return product;
    } catch (error) {
      return rejectWithValue({ error: "Product Not Deleted" });
    }
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    removeProductFromList: (state, action) => {
      state.productsList = state.productsList.filter(
        (product) => product._id !== action.payload._id
      );
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestionList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSuggestions.pending, (state) => {
        state.isSuggestionLoading = true;
      })
      .addCase(searchSuggestions.fulfilled, (state, action) => {
        state.isSuggestionLoading = false;
        state.error = "";
        state.suggestionList = action.payload;
      })
      .addCase(searchSuggestions.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isSuggestionLoading = false;
        state.suggestionList = [];
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.productsList = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.productsList = [];
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.productsList.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.productsList = state.productsList.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.productsList = state.productsList.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const { removeProductFromList, setSelectedProduct, clearSuggestions  } =
  productsSlice.actions;

export default productsSlice.reducer;
