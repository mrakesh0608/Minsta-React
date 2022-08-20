import { createContext, useReducer } from 'react'

export const PostListContext = createContext();

export const postListReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POSTS':{
            if(!state.posts){
                return {
                    posts: action.payload
                }
            }
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