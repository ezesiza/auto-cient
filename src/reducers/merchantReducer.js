import {
  GET_MERCHANTS,
  MERCHANT_LOADING,
  DELETE_MERCHANTS,
  GET_BIDS,
  GET_ONE,
} from "../actions/types";

const initialState = {
  merchants: [],
  bids:[],
  merchant: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MERCHANT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MERCHANTS:
      return {
        ...state,
        merchants: state.merchants.filter((item) => item.id !== action.payload),
      };
    case GET_MERCHANTS:
      return {
        ...state,
        merchants: action.payload,
        loading: false,
      };
    case GET_ONE:
      return {
        ...state,
        merchant: action.payload,
      };
    case GET_BIDS:
      return {
        ...state,
        bids: action.payload,
      };
    default:
      return state;
  }
}
