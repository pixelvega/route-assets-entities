import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


export default function TableBody({ state, keys, path, Context }) {

  const triggerMenu = useContext(Context);
  let isEntity = (path !== 'entity');

  return (
    <tbody>
      {
        state.map((item, i) => {
          let count = 0;
          return (
            <tr
              className="tr item"
              key={i}
              onContextMenu={(e) => {
                if (!isEntity) {
                  return triggerMenu({ type: 'showContextMenu', event: e.nativeEvent, idItem: item.id, posX: e.clientX, posY: e.clientY })
                } else {
                  return null
                }
              }
              }
              onClick={(e) => {
                if (!isEntity) {
                  return triggerMenu({ type: 'hideContextMenu' })
                } else {
                  return null;
                }
              }
              } >

              {Object.keys(item).map((key, i) => {
                let index = i - count;
                if (key !== keys[index]) {
                  count--;
                  return (
                    <React.Fragment key={i}>

                      <td className="td empty"></td>
                      <td className="td" key={i}>{item[key]}</td>
                    </React.Fragment>
                  )
                } else {
                  return (<td className="td" key={i}>{item[key]}</td>)
                }
              })}

              {isEntity
                ?
                <td className="td action"><Link className="btn" to={`/entity/${item.id}`} key={item.id}>See related entities</Link></td>
                :
                null
              }

            </tr>

          )
        })
      }
    </tbody>
  );
}