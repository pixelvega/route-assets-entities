import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let keys = [];
let assets = [];
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
      <h1>ASSETS</h1>
      <table>
        <TableHead keys={keys} />
        <TableBody state={state} />
      </table>
    </div>
  );
}

function TableHead({ keys }) {
  return (
    <thead>
      <tr className="tr head">
        {keys.map((key, i) => <th className="th" key={i}>{key}</th>)}
        <th className="th action"></th>
      </tr>
    </thead>
  );
}

function TableBody({ state }) {
  return (
    <tbody>
      {
        state.map((item, i) => {
          return (
            <tr className="tr item" key={i}>
              <td className="td">{item.id}</td>
              <td className="td">{item.t_street_name}</td>
              <td className="td">{item.n_number}</td>
              <td className="td">{item.t_city}</td>
              <td className="td">{item.t_code}</td>
              <td className="td action"><Link to={`/entity/${item.id}`} key={item.id}>SEE</Link></td>
            </tr>
          )
        })
      }
    </tbody>
  );
}