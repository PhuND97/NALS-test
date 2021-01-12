import React, { useEffect, useState } from 'react';
import './StripedTable.css';
import { Avatar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useHistory } from 'react-router-dom';

function StripedTable() {
  const userAuth = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection('users').orderBy('stt', 'asc').onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    if (!userAuth) {
      history.push('/');
    }

  }, []);
  
  return (
    <div className="stripedtable">
      <h4>STRIPED TABLE</h4>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 60 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Progress</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, data: { userImageUrl, firstName, progress, progressColor, amount, deadline}}, index) => (
              <TableRow style={{ backgroundColor: (index % 2 === 0) ? '#DDDCE1' : 'white' }} key={id}>
                <TableCell component="th" scope="row">
                  <Avatar src={userImageUrl}/>
                </TableCell>
                <TableCell align="left">{firstName}</TableCell>
                <TableCell align="left">
                  <ProgressBar className={progressColor} now={progress} />
                </TableCell>
                <TableCell align="left">$ {Number(amount).toFixed(2)}</TableCell>
                <TableCell align="left">{deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StripedTable;
