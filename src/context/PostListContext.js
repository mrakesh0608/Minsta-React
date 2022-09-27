import { createContext, useReducer } from 'react'

export const PostListContext = createContext();

export const postListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE': {
            return {
                ...state,
                page: action.payload
            }
        }
        case 'SET_NO_MORE_POSTS': {
            return {
                ...state,
                noMorePosts: true
            }
        }
        case 'ADD_POSTS': {
            if (state.posts.length === 0) {
                return {
                    ...state,
                    page:state.page+1,
                    posts: action.payload
                }
            }
            let load = [];
            action.payload.forEach(post => {
                if (!state.posts.find(p => p._id === post._id)) load.push(post)
            });
            return {
                ...state,
                page:state.page+1,
                posts: [...state.posts, ...load]
            }
        }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload._id)
            }
        case 'REFRESH': {
            return {
                posts: [],
                page: 0,
                noMorePosts: false
            }
        }
        default:
            return state
    }
}

export const PostListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postListReducer, {
        posts: [],
        page: 0,
        noMorePosts: false
    })

    // console.log('PostListContext state:', state);
    return (
        <PostListContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostListContext.Provider>
    )
}