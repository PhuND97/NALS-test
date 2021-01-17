import React, { useEffect, useState } from 'react';
import './UserModal.css';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { DialogTitle, TextField } from '@material-ui/core';
import { ColorPicker } from 'material-ui-color';
import { db } from '../firebase';

function UserModal({ typeOfModal, onCloseDialog }) {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState('#000');
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [totalUser, setTotalUsers] = useState([]);

  useEffect(() => {
    db.collection('users').orderBy('stt', 'asc').onSnapshot((snapshot) => setTotalUsers(snapshot.docs.length));
  });

  const addData = () => {
    db.collection('users').add({
      userImageUrl: userImageUrl,
      firstName: firstName,
      progress: progress,
      progressColor: progressColor,
      amount: amount,
      deadline: deadline,
      stt: totalUser + 1,
    })
      .then(() => onCloseDialog())
      .catch(e => console.error(e));
  };

  return (
    <div className='modal'>
      <Dialog
        open={typeOfModal === 'new' || typeOfModal === 'edit'}
        onClose={onCloseDialog}
      >
        <DialogTitle id="simple-dialog-title">{typeOfModal === 'new' ? 'Add New User' : 'Update User'}</DialogTitle>
        <DialogContent className='modal__content'>
          <TextField label="Avatar" onChange={e => setUserImageUrl(e.target.value)} />
          <TextField label="First Name" onChange={e => setFirstName(e.target.value)} />
          <TextField label="Progress" onChange={e => setProgress(e.target.value)} />
          <ColorPicker 
            className='color__picker'
            value={progressColor} 
            onChange={e => setProgressColor(e.css.backgroundColor)} 
          />
          <TextField label="Amount" onChange={e => setAmount(e.target.value)} />
          <TextField style={{ marginTop: 10 }} label="Deadline" type="date" InputLabelProps={{ shrink: true }} onChange={e => setDeadline(e.target.value)} />
          <div className='modal__buttons'>
            {typeOfModal === 'new' ? 
              (
                <Button variant="contained" color="primary" onClick={addData}>
                    Create
                </Button>
              ) : (
                <Button variant="contained" color="primary">
                    Update
                </Button>
              )}
            <Button variant="contained" onClick={onCloseDialog}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

UserModal.propTypes = {
  typeOfModal: PropTypes.object,
  onCloseDialog: PropTypes.func
};

export default UserModal;
