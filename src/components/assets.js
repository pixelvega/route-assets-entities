import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import TableHead from './TableHead';
import TableBody from './TableBody';

let keys = [];
let assets = [];
let path = 'assets';

function appReducer(state, action) {
  switch (action.type) {
    case 'save': {
      let data = action.payload;
      assets = data;

      if (data.length && !keys.length) {
        for (const key in data[0]) {
          keys.push(key);
        }
      }

      return assets;
    }

    default: {
      return state;
    }
  }
}

const Context = React.createContext();

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
    <div className="page-wrapper">
      <h1 className="page-title">Assets</h1>
      {
        assets.length
          ?
          <div>
            <table>
              <TableHead keys={keys} path={path} />
              <TableBody state={state} keys={keys} path={path} Context={Context} />
            </table>
          </div>
          :
          <p className="spinner">Loading data...</p>
      }
    </div>
  );
}
