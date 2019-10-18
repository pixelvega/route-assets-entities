import React from 'react';
import { Link } from 'react-router-dom';

export default function TableBody({ state, keys, path }) {
  let isEntity = (path !== 'entity');
  return (
    <tbody>
      {
        state.map((item, i) => {
          let count = 0;
          return (
            <tr className="tr item" key={i}>
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
                <td className="td action"><Link to={`/entity/${item.id}`} key={item.id}>See related entities</Link></td>
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