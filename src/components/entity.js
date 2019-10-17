import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function appReducer(state, action) {
  switch (action.type) {
    case 'save': {
      console.log(action.payload)
      console.log('action.id: ', action.id)
      let entity = action.payload.filter(item => item.id_asset === parseInt(action.id))
      console.log('entity: ', entity)
      return action.payload;
    }

    default: {
      return state;
    }
  }
}


export default function Entity() {
  const [state, dispatch] = useReducer(appReducer, [])
  const ENDPOINT = 'https://6y458uslg3.execute-api.eu-west-3.amazonaws.com/elixos/entities';
  let { id } = useParams();

  useEffect(() => {
    axios.get(ENDPOINT)
      .then(response => {
        dispatch({ type: 'save', payload: response.data.entities, id: id })
      })
      .catch(error => {
        dispatch({ type: 'save', payload: [] })
      })
  }, [])

  return (
    <div>{id}
      <div>
        Entity
      </div>
    </div>
  );
}