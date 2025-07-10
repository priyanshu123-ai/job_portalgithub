import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAdminJobs: [],
  allJobs: [], // for job listing page
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchQuery:"",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    clearSingleJob: (state) => {
      state.singleJob = null;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery:(state,action) => {
      state.searchQuery = action.payload
    }
  },
});

export const {
  setAllJobs,
  setSingleJob,
  clearSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchQuery
} = jobSlice.actions;
export default jobSlice.reducer;
