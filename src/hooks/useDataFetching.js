import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  data: {}
}

export default function useDataFetching({ createUrl = () => "", onSuccess = () => null, onError = () => null }) {
  const params = useParams();
  const [state, setState] = useState(initialState)

  useEffect(() => {
    fetch(createUrl(params))
      .then(res => res.json())
      .then(json => {
        setState(prev => ({
          ...prev,
          data: json,
          isLoading: false,
          isSuccess: true,
        }));
        onSuccess({data: json});
      })
      .catch(function (error) {
        setState(prev => ({
          ...prev,
          data: error,
          isLoading: false,
          isError: true,
        }));
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