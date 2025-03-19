import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
  name: string;
  quantity: number;
  costperunit: number;
  amount: number;
  date: string;
}

interface apiState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: apiState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<Transaction[], void>(
  "api/fetchData",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/transactions/");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }
);

export const addData = createAsyncThunk<Transaction, Transaction>(
  "api/addData",
  async (newTransaction) => {
    const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });
    if (!response.ok) throw new Error("Failed to add transaction");
    return response.json();
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      //add transaction
      .addCase(addData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addData.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false;
          state.data.unshift(action.payload);
        }
      )
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default apiSlice.reducer;
