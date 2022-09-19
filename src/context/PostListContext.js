import { createContext, useReducer } from 'react'

export const PostListContext = createContext();

export const postListReducer = (state, action) => {
    // console.log('kk');
    switch (action.type) {
        case 'ADD_POSTS': {
            if (state.posts.length === 0) {
                return {
                    posts: action.payload
                }
            }
            let load = [];
            action.payload.forEach(post => load.push(post));
            return {
                posts: [...state.posts, ...load]
            }
        }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id)
            }
        case 'REFRESH': {
            return { posts: [] }
        }
        default:
            return state
    }
}

export const PostListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postListReducer, {
        posts: []
    })

    // console.log('PostListContext state:', state)
    return (
        <PostListContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostListContext.Provider>
    )
}