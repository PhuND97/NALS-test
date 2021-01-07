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

function StripedTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection('users').onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  
  return (
    <div className="stripedtable">
      <p>STRIPED TABLE</p>
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
                <TableCell align="left">$ {amount}</TableCell>
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
