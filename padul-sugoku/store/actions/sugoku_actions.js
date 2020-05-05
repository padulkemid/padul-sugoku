import { SET_BOARD, VALIDATE_BOARD, SOLVE_BOARD } from './action_key';

const dispatchUnsolvedBoard = (difficulty) => {
  return (dispatch, _) => {
    fetchBoard(difficulty).then((res) => {
      dispatch(returnUnsolvedBoard(res));
    });
  };
};

const dispatchSolvedBoard = (board) => {
  return (dispatch, _) => {
    solveBoard(board).then((res) => {
      dispatch(returnSolvedBoard(res));
    });
  };
};

const dispatchValidation = (board) => {
  return (dispatch, _) => {
    validateBoard(board).then((res) => {
      dispatch(returnValidationState(res));
    });
  };
};

// -------------------- Logics ----------------------

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

const fetchBoard = (difficulty) => {
  const uri = `${baseUri}/board?difficulty=${difficulty}`;

  return fetch(uri)
    .then((res) => res.json())
    .then((data) => data.board);
};

const solveBoard = (board) => {
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
    .then((data) => data.solution);
};

const validateBoard = (board) => {
  let validated = false;
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
    .then((data) => data.status)
    .then((status) => {
      if (status === 'solved') {
        validated = true;
      }

      return validated;
    });
};

const returnUnsolvedBoard = (board) => {
  return {
    type: SET_BOARD,
    payload: board,
  };
};

const returnSolvedBoard = (board) => {
  return {
    type: SOLVE_BOARD,
    payload: board,
  };
};

const returnValidationState = (bool) => {
  return {
    type: VALIDATE_BOARD,
    payload: bool,
  };
};

export { dispatchUnsolvedBoard, dispatchSolvedBoard, dispatchValidation };
