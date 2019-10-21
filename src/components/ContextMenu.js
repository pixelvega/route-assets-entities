import React from 'react';

function handleTest(idItem) {
  console.log({ idItem })
}

export default function ContextMenu({ ContextMenu, idItem, style }) {

  return (
    <div className="ContextMenu" style={style}>
      <div className="arrow-up"></div>
      <div className="context-menu_title">Show ID</div>
      <button className="btn" onClick={(e) => handleTest(idItem)}>TEST</button>
    </div>
  )

}