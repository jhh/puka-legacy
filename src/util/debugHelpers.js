import React from 'react';

export const puke = (object) =>
  <pre>{JSON.stringify(object, null, ' ')}</pre>;


export const dumpPukaResponse = (data, meta, links, jsonapi) => (
  <div>
    <h3>Meta</h3>
    {puke(meta)}
    <h3>Links</h3>
    {puke(links)}
    <h3>Jsonapi</h3>
    {puke(jsonapi)}
    <h3>Data</h3>
    {puke(data)}
  </div>
  );
