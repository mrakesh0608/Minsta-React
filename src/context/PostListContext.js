import { createContext, useReducer } from 'react'

import {loadMore} from 'components/Post/PostList'

export const PostListContext = createContext();

export const postListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'ADD_MORE_POSTS':{
            let load= [];
            action.payload.forEach(post=>{
                if((action.payload).indexOf(post) === -1){
                    load.push(post)
                }
            })
            return {
                posts: [...state.posts, ...load]
            }
        }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id)
            }
        case 'REFRESH':{
            loadMore();
            return {posts: null}
        }
        default:
            return state
    }
}

export const PostListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postListReducer, {
        posts: null
    })

    console.log('PostListContext state:', state)
    return (
        <PostListContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostListContext.Provider>
    )
}