import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import TableHead from './TableHead';
import TableBody from './TableBody';

import ContextMenu from './ContextMenu';

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

function contextMenuReducer(contextMenu, action) {
  switch (action.type) {
    case 'showContextMenu': {
      action.event.preventDefault()
      let contextMenu = {
        isVisible: true,
        posX: action.posX,
        posY: action.posY,
        idItem: action.idItem,
        style: {
          'position': 'absolute',
          'left': `${action.posX + 5}px`,
          'top': `${action.posY + 15}px`
        }
      }
      return contextMenu;
    }

    case 'hideContextMenu': {
      return {
        ...contextMenu,
        isVisible: false
      };
    }

    default: {
      return {};
    }
  }
}

const Context = React.createContext();

export default function Entity() {

  let { id } = useParams();
  const [state, dispatch] = useReducer(appReducer, [])
  const [contextMenu, triggerMenu] = useReducer(contextMenuReducer, []);

  const ENDPOINT = 'https://6y458uslg3.execute-api.eu-west-3.amazonaws.com/elixos/entities';

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
    <div className="page-wrapper">
      <h1 className="page-title">Entities: {entities.length} of id_asset: {id}</h1>
      <Link to="/" className="link">Back</Link>

      {
        contextMenu.isVisible ?
          <ContextMenu contextMenu={contextMenu} idItem={contextMenu.idItem} style={contextMenu.style}></ContextMenu>
          :
          null
      }
      {
        entities.length
          ?
          <div className="table-wrapper">
            <table>
              <TableHead keys={keys} path={path} />
              <Context.Provider value={triggerMenu}>
                <TableBody state={state} keys={keys} path={path} Context={Context} />
              </Context.Provider>
            </table>
          </div>
          :
          <p className="spinner">Loading data...</p>
      }

    </div>
  );
}