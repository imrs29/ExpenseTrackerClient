import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//action for redirect
export const resetExpCreated = createAction("expense/created/reset");
export const resetExpUpdate = createAction("expense/update/reset");

//register action
export const createExpAction = createAsyncThunk(
  "expense/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(`${baseUrl}/expenses`, payload, config);
      //dispatch
      dispatch(resetExpCreated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update
export const updateExpAction = createAsyncThunk(
  "expense/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/expenses/${payload?.id}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all action
export const fetchAllExpAction = createAsyncThunk(
  "expense/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/expenses?page=${payload}`,
        config
      );
      dispatch(resetExpCreated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const expenseSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: (builder) => {
    //create expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset action
    builder.addCase(resetExpCreated, (state, action) => {
      state.isExpCreated = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //fetch all expenses
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //update expenses
    builder.addCase(updateExpAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset action
    builder.addCase(resetExpUpdate, (state, action) => {
      state.isExpUpdated = true;
    });
    builder.addCase(updateExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default expenseSlices.reducer;
