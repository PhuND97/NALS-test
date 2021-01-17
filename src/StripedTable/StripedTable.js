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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
import UserModal from './UserModal';

function StripedTable() {
  const userAuth = useSelector(selectUser);
  const history = useHistory();
  const positionMenu = {
    mouseX: null,
    mouseY: null,
  };
  const propSort = {
    path: 'stt',
    dir: 'asc',
  };
  const [users, setUsers] = useState([]);
  const [posMenu, setPosMenu] = useState(positionMenu);
  const [inforSort, setInforSort] = useState(propSort);
  const [idSelected, setIdSelected] = useState('');
  const [typeOfModal, setTypeOfModal] = useState('');

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
  const rightClickRow = (event, id) => {
    event.preventDefault();
    setIdSelected(id);
    setPosMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseMenu = () => {
    setPosMenu(positionMenu);
  };

  const onCloseDialog = () => {
    setTypeOfModal('');
  };

  const addUser = () => {
    setIdSelected('');
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

  const toggleSort = (e) => {
    setInforSort({
      path: e.target.title,
      dir: inforSort.dir === 'asc' ? 'desc' : 'asc',
    });
  };

  const convertISOToLongDate = (date) => {
    let month = monthNames[parseInt(date.slice(5,7)) - 1];
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    db.collection('users').orderBy(inforSort.path, inforSort.dir).onSnapshot((snapshot) =>
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
  }, [inforSort.path, inforSort.dir]);
  
  return (
    <div className="stripedtable">
      <div className="stripedtable__header">
        <h4>STRIPED TABLE</h4>
        <AddIcon onClick={addUser} />
      </div>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 60 }} aria-label="simple table">
          <colgroup>
            <col style={{width:'13.7%'}}/>
            <col style={{width:'24.9%'}}/>
            <col style={{width:'19%'}}/>
            <col style={{width:'17.6%'}}/>
            <col style={{width:'24.8%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell onClick={toggleSort} title="stt">User
                {inforSort.path === 'stt' && inforSort.dir === 'asc' ? <KeyboardArrowDownIcon/> : undefined}
                {inforSort.path === 'stt' && inforSort.dir === 'desc' ? <KeyboardArrowUpIcon/> : undefined}
              </TableCell>
              <TableCell align="left" onClick={toggleSort} title="firstName">First name
                {inforSort.path === 'firstName' && inforSort.dir === 'asc' ? <KeyboardArrowDownIcon/> : undefined}
                {inforSort.path === 'firstName' && inforSort.dir === 'desc' ? <KeyboardArrowUpIcon/> : undefined}
              </TableCell>
              <TableCell align="left" onClick={toggleSort} title="progress">Progress
                {inforSort.path === 'progress' && inforSort.dir === 'asc' ? <KeyboardArrowDownIcon/> : undefined}
                {inforSort.path === 'progress' && inforSort.dir === 'desc' ? <KeyboardArrowUpIcon/> : undefined}
              </TableCell>
              <TableCell align="left" onClick={toggleSort} title="amount">Amount
                {inforSort.path === 'amount' && inforSort.dir === 'asc' ? <KeyboardArrowDownIcon/> : undefined}
                {inforSort.path === 'amount' && inforSort.dir === 'desc' ? <KeyboardArrowUpIcon/> : undefined}
              </TableCell>
              <TableCell align="left" onClick={toggleSort} title="deadline">Deadline
                {inforSort.path === 'deadline' && inforSort.dir === 'asc' ? <KeyboardArrowDownIcon/> : undefined}
                {inforSort.path === 'deadline' && inforSort.dir === 'desc' ? <KeyboardArrowUpIcon/> : undefined}
              </TableCell>
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
                <TableCell align="left">{convertISOToLongDate(deadline)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        open={posMenu.mouseY !== null}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          posMenu.mouseY !== null && posMenu.mouseX !== null
            ? { top: posMenu.mouseY, left: posMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={editUser}>Edit</MenuItem>
        <MenuItem onClick={deleteUser}>Delete</MenuItem>
      </Menu>
      <UserModal typeOfModal={typeOfModal} onCloseDialog={onCloseDialog} idSelected={idSelected}/>
    </div>
  );
}

export default StripedTable;
