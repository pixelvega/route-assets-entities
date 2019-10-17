import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function appReducer(state, action) {
  switch (action.type) {
    case 'save': {
      console.log(action.payload)

      return action.payload;
    }

    default: {
      return state;
    }
  }
}

export default function Assets() {
  const [state, dispatch] = useReducer(appReducer, [])
  const ENDPOINT = 'https://6y458uslg3.execute-api.eu-west-3.amazonaws.com/elixos/assets';

  useEffect(() => {
    axios.get(ENDPOINT)
      .then(response => {
        dispatch({ type: 'save', payload: response.data.assets })
      })
      .catch(error => {
        dispatch({ type: 'save', payload: [] })
      })
  }, [])

  return (
    <div>
      <div>ASSETS</div>
      {
        state.map(item => {
          return (
            <Link to={`/entity/${item.id}`} key={item.id}>
              <div className="item">
                {item.id} - {item.t_street_name}
              </div>
            </Link>
          )
        })
      }
    </div>
  );
}