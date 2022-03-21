# 📷 My Unspash

## Overview

A project I created my Unsplash app

### Built with

- State management: `redux-toolkit`
- Routing: `react-router-dom`
- Masonry layout: `masonic`
- CSS library: `styled-components`
- HTTP client: `axios`

### Pages

- /photos: ListPage

## Features

- photo

`photoSlice.js`

```js
export const fetchPhotoList = createAsyncThunk('photo/fetchPhotoList', async (payload) => {
  const data = await photoApi.getAll(payload);
  return data;
});

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    list: [],
    filter: {
      label_like: '',
    },

    deleteMode: false,
    selectedPhotoId: '',
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },

    setDeleteMode(state, action) {
      state.deleteMode = action.payload;
    },

    setSelectedPhotoId(state, action) {
      state.selectedPhotoId = action.payload;
    },
  },

  extraReducers: {
    [fetchPhotoList.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
  },
});
```

## How to use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/kctrnn/my-unsplash

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Acknowledgements

- [masonic](https://www.npmjs.com/package/masonic)
- [Redux-Toolkit](https://redux-toolkit.js.org)
- [styled-components](https://styled-components.com)

## Contact

- GitHub [@kctrnn](https://github.com/kctrnn)
- Twitter [@kctrnn](https://twitter.com/kctrnn)
- LinkedIn [@kctrnn](https://www.linkedin.com/in/kctrnn)
