import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    input: "",
    display: "",
    images: [],
    page: 1,
    recentSearches: []
  },
  reducers: {
    //----- Set input
    setInput: (state, action) => {
      let input = action.payload;
      state.input = input;
      console.log(`Input: ${state.input}`);
      // Reset page state
      state.page = 1;
    },
    //----- Set images
    setImages: (state, action) => {
      let images = action.payload;
      state.images = [...images];
      console.log("Images updated");
      // Update display
      state.display = "images";
    },
    //----- Set recent searches
    setRecentSearches: (state, action) => {
      let recentSearches = action.payload;
      state.recentSearches = [...recentSearches];
      console.log("Recent Searches updated");
      // Update display
      state.display = "recent";
    },
    //----- Next Page
    nextPage: (state) => {
      state.page = state.page + 1;
      console.log(`Page: ${state.page}`);
    },
    //----- Previous page
    prevPage: (state) => {
      state.page = state.page - 1;
      console.log(`Page: ${state.page}`);
    }
  }
});

// Action creators are generated for each case reducer function
export const { setInput, setImages, setRecentSearches, nextPage, prevPage } = appSlice.actions;

export default appSlice.reducer;