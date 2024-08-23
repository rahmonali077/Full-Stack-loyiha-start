import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/auth'
import ArticleReducer from '../slice/article'

export default configureStore({
  reducer: { 
    auth: authReducer,
    article: ArticleReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
})