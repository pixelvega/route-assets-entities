import React from 'react';

export default function TableHead({ keys, path }) {
  let isEntity = (path !== 'entity');

  return (
    <thead>
      <tr className="tr head">
        {keys.map((key, i) => <th className="th" key={i}>{key}</th>)}
        {isEntity
          ?
          <th className="th action"></th>
          :
          null
        }

      </tr>
    </thead>
  );
}