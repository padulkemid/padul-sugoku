import { useState, useEffect } from 'react';

const baseUri = 'https://sugoku.herokuapp.com';

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export const useSugokuBoard = () => {
  const uri = `${baseUri}/board?difficulty=easy`;
  const [board, setBoard] = useState([]);

  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then((data) => setBoard(data.board));
  }, [uri]);

  return board;
};

export const useSugokuSolve = (board) => {
  const uri = `${baseUri}/solve`;
  const data = {
    board,
  };

  return fetch(uri, {
    method: 'post',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then((res) => res.json())
    .then((res) => res.solution);
};

export const useSugokuValidate = (board) => {
  const uri = `${baseUri}/validate`;
  const data = {
    board,
  };

  return fetch(uri, {
    method: 'post',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then((res) => res.json())
    .then((res) => res.status);
};
