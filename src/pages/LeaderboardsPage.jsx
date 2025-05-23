import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderBoardItem from '../components/LeaderboardItem';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{  justifyItems:'center' }}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        color="text.primary"
        sx={{ fontWeight: 'bold', ml: 2, mt: 2 }}
      >
        Leaderboards
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="2"></TableCell>
              <TableCell align="center">Top 10</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboards.map(({ user, score }) => (
              <LeaderBoardItem key={user.id} user={user} score={score} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
