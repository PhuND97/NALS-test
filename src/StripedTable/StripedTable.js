import React, { useEffect, useState } from 'react';
import './StripedTable.css';
import { Avatar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
import UserModal from './UserModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function StripedTable() {
  const userAuth = useSelector(selectUser);
  const history = useHistory();
  const positionMenu = {
    mouseX: null,
    mouseY: null,
  };
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(positionMenu);
  const [idSelected, setIdSelected] = useState('');
  const [typeOfModal, setTypeOfModal] = useState('');
    
  const rightClickRow = (event, id) => {
    event.preventDefault();
    setIdSelected(id);
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseMenu = () => {
    setState(positionMenu);
  };

  const onCloseDialog = () => {
    setTypeOfModal('');
  };

  const addUser = () => {
    setTypeOfModal('new');
  };

  const editUser = () => {
    setTypeOfModal('edit');
    handleCloseMenu();
  };

  const deleteUser = () => {
    db.collection('users').doc(idSelected).delete()
      .then(() => console.log('Deleted ', idSelected));

    setIdSelected('');
    handleCloseMenu();
  };

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
      <div className="stripedtable__header">
        <h4>STRIPED TABLE</h4>
        <AddIcon onClick={addUser} />
      </div>
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
              <TableRow style={{ backgroundColor: (index % 2 === 0) ? '#DDDCE1' : 'white' }} key={id} onContextMenu={e => rightClickRow(e, id)}>
                <TableCell component="th" scope="row">
                  <Avatar src={userImageUrl}/>
                </TableCell>
                <TableCell align="left">{firstName}</TableCell>
                <TableCell align="left">
                  <div className="progress">
                    <div style={{ backgroundColor: `${progressColor}`, width: `${progress}%` }} className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"/>
                  </div>
                </TableCell>
                <TableCell align="left">$ {Number(amount).toFixed(2)}</TableCell>
                <TableCell align="left">{deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        open={state.mouseY !== null}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={editUser}>Edit</MenuItem>
        <MenuItem onClick={deleteUser}>Delete</MenuItem>
      </Menu>
      <UserModal typeOfModal={typeOfModal} onCloseDialog={onCloseDialog} />
    </div>
  );
}

export default StripedTable;
