import { createContext, useReducer } from 'react'

export const ReelContext = createContext();

export const reelReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE': {
            return {
                ...state,
                page: action.payload
            }
        }
        case 'SET_NO_MORE_REELS': {
            return {
                ...state,
                noMoreReels: true
            }
        }
        case 'SET_LAST_VIEWED': {
            return {
                ...state,
                lastViewed: action.payload
            }
        }
        case 'ADD_REELS': {
            if (state.reels.length === 0) {
                return {
                    ...state,
                    page:state.page+1,
                    reels: action.payload
                }
            }
            let load = [];
            action.payload.forEach(reel => {
                if (!state.reels.find(r => r._id === reel._id)) load.push(reel)
            });
            return {
                ...state,
                page:state.page+1,
                reels: [...state.reels, ...load]
            }
        }
        case 'DELETE_POST':
            return {
                ...state,
                reels: state.reels.filter(post => post._id !== action.payload._id)
            }
        case 'REFRESH': {
            return {
                reels: [],
                page: 0,
                noMorereels: false,
                lastViewed:null
            }
        }
        default:
            return state
    }
}

export const ReelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reelReducer, {
        reels: [],
        page: 0,
        noMoreReels: false,
        lastViewed:null
    })

    console.log('ReelContext state:', state)
    return (
        <ReelContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ReelContext.Provider>
    )
}