import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Avatar } from '@mui/material';
import { userShape } from './ThreadItem';

export default function LeaderBoardItem({ user, score }) {
  return (
    <TableRow>
      <TableCell>
        <Avatar
          alt="Avatar Icon"
          src={user.avatar}
          sx={{ width: 34, height: 34, ml: 2 }}
        />
      </TableCell>
      <TableCell align="center">{user.name}</TableCell>
      <TableCell align="center">{score}</TableCell>
    </TableRow>
  );
}

LeaderBoardItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};
