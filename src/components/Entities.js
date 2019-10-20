import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TableHead from './TableHead';
import TableBody from './TableBody';

let entities = [];
let keys = [];
const path = 'entity';



function appReducer(state, action) {
  switch (action.type) {
    case 'save': {
      let data = action.payload;
      entities = data.filter(entity => entity.id_asset === parseInt(action.id));
      if (data.length && !keys.length) {
        for (const key in data[0]) {
          keys.push(key);
        }
      }

      return entities;
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
    <div>
      <h1>Entities: {entities.length} of id_asset: {id}</h1>
      {
        entities.length
          ?
          <React.Fragment>
            <table>
              <TableHead keys={keys} path={path} />
              <TableBody state={state} keys={keys} path={path} />
            </table>
          </React.Fragment>
          :
          <p>Loading data...</p>
      }

    </div>
  );
}