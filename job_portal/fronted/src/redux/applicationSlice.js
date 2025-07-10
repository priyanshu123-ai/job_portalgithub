import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applicants: [], // use consistent naming (was applications in state, but reducer uses applicants)
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
