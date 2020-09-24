import axios from "axios";
import { GET_ERRORS,GET_ONE,GET_BIDS, DELETE_MERCHANTS, GET_MERCHANTS } from "./types";

const baseUrl = 'http://127.0.0.1:3000/merchant'


//get all merchants
export const getMerchants = () => (dispatch) => {
  axios
    .get(baseUrl)
    .then((res) =>
      dispatch({
        type: GET_MERCHANTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MERCHANTS,
        payload: null,
      })
    );
};
//add a new merchant
export const addMerchant=(merchantData, history)=>dispatch=>{
    axios.post(baseUrl+`/create`, merchantData).then(()=>history.push("/"))
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}


//edit merchant
export const editMerchant=( merchantData, history)=>dispatch=>{
    axios.put(baseUrl+`/edit`, merchantData)
    .then(res => {
        return history.push("/")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get a single merchant
export const getOneMerchant=(id)=>dispatch=>{
    axios.get(baseUrl+`/${id}`).then(res=>dispatch({
        type:GET_ONE,
        payload:res.data
    })).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}

//Delete Merchant
export const deleteMerchant = id => dispatch => {
    axios
      .delete(baseUrl+`/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_MERCHANTS,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

//get all bids
  export const getBids = () => (dispatch) => {
    axios
      .get(baseUrl + "/bids/bid")
      .then((res) =>
        dispatch({
          type: GET_BIDS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_BIDS,
          payload: null,
        })
      );
  };
