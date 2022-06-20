import { useReducer, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  data: {}
}

export function reducer(state, action) {
  switch (action.type) {
    case "success":
      return { ...state, data: action.json, isLoading: false, isSuccess: true };
    
    case "error":
      return { ...state, data: action.error, isLoading: false, isError: true };
    
    case "reset":
      return initialState;
  
    default:
      return state;
  }
}

export default function useDataFetching({ createUrl = () => "", onSuccess = () => null, onError = () => null }) {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(createUrl(params))
      .then(res => res.json())
      .then(json => {
        dispatch({ type: "success", json });
        onSuccess({data: json});
      })
      .catch(function (error) {
        dispatch({ type: "error", error });
        onError({error});
      })
  }, [createUrl]);

  return {
    isLoading: state.isLoading,
    isError: state.isError,
    isSuccess: state.isSuccess,
    data: state.data
  }
}