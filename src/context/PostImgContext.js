import { createContext, useReducer } from 'react'

export const PostImgContext = createContext();

export const postImgReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST_IMG':
            return {
                postImgs: [...state.postImgs, action.payload]
            }
        case 'DELETE_POST':
            return {
                postImgs: state.postImgs.filter(postImg => postImg._id !== action.payload._id)
            }
        case 'REFRESH':{
            return {postsImg: []}
        }
        default:
            return state
    }
}

export const PostImgContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postImgReducer, {
        postImgs: []
    })

    console.log('PostImgContext state:', state)
    return (
        <PostImgContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostImgContext.Provider>
    )
}