import axios from "axios"


const initialState = {
    purchase: [],
    budgetLimit: null,
    loading: false
}

export const requestBudgetData = () => {
    let data = axios.get("/api/budget-data").then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}
export const addPurchase = (price, description, category) => {
    let data = axios.post("/api/budget-data/purchase", {description, price, category}).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}
export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: DELETE_PURCHASE,
        payload: data
    }
}

export const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA"
export const ADD_PURCHASE = "ADD_PURCHASE"
export const DELETE_PURCHASE = "DELETE_PURCHASE"

export default function(state = initialState, action){
    switch(action.type){
        case `${REQUEST_BUDGET_DATA}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${REQUEST_BUDGET_DATA}_FULFILLED`:
            return {
                ...state,
                loading: false,
                budgetLimit: action.payload.budgetLimit
            }
        case `${ADD_PURCHASE}__PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${ADD_PURCHASE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                purchase: [action.payload]
            }
        case `${DELETE_PURCHASE}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${DELETE_PURCHASE}_FULFILLED`:
            return{
                ...state,
                loading: false,
                purchase: [action.payload]
            }
        default:
            return state
}
}