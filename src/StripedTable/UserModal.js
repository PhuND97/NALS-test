import React, { useEffect, useState } from 'react';
import './UserModal.css';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { DialogTitle, TextField } from '@material-ui/core';
import { ColorPicker } from 'material-ui-color';
import { db } from '../firebase';

function UserModal({ typeOfModal, onCloseDialog, idSelected }) {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState('#000');
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [totalUser, setTotalUser] = useState([]);

  useEffect(() => {
    db.collection('users').orderBy('stt', 'asc').onSnapshot((snapshot) => {
      setTotalUser(snapshot.docs.length);
    });
    if (idSelected) {
      db.collection('users').doc(idSelected).get()
        .then(doc => {
          setUserImageUrl(doc?.data().userImageUrl);
          setFirstName(doc?.data().firstName);
          setProgress(doc?.data().progress);
          setProgressColor(doc?.data().progressColor);
          setAmount(doc?.data().amount);
          setDeadline(doc?.data().deadline);
        });
    } else {
      setUserImageUrl();
      setFirstName();
      setProgress();
      setProgressColor('#FFF');
      setAmount();
      setDeadline();
    }
  }, [idSelected, typeOfModal, totalUser]);

  const addNewUser = () => {
    db.collection('users').add({
      userImageUrl: userImageUrl,
      firstName: firstName,
      progress: progress,
      progressColor: progressColor,
      amount: parseFloat(amount),
      deadline: deadline,
      stt: totalUser + 1,
    })
      .then(() => onCloseDialog())
      .catch(e => console.error(e));
  };

  const updateUser = () => {
    db.collection('users').doc(idSelected).update({
      userImageUrl: userImageUrl,
      firstName: firstName,
      progress: progress,
      progressColor: progressColor,
      amount: parseFloat(amount),
      deadline: deadline,
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
          <TextField 
            label="Avatar" 
            onChange={e => setUserImageUrl(e.target.value)} 
            value={userImageUrl}
          />
          <TextField 
            label="First Name" 
            onChange={e => setFirstName(e.target.value)} 
            value={firstName}
          />
          <TextField 
            label="Progress" 
            onChange={e => setProgress(e.target.value)} 
            value={progress}
          />
          <ColorPicker 
            className='color__picker'
            value={progressColor} 
            onChange={e => setProgressColor(e.css.backgroundColor)} 
          />
          <TextField 
            label="Amount" 
            onChange={e => setAmount(e.target.value)} 
            value={amount}
          />
          <TextField 
            style={{ marginTop: 10 }} 
            label="Deadline" 
            type="date" 
            InputLabelProps={{ shrink: true }} 
            onChange={e => setDeadline(e.target.value)} 
            value={deadline}
          />

          <div className='modal__buttons'>
            {typeOfModal === 'new' ? 
              (
                <Button variant="contained" color="primary" onClick={addNewUser}>
                    Create
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={updateUser}>
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
  typeOfModal: PropTypes.string,
  idSelected: PropTypes.string,
  onCloseDialog: PropTypes.func
};

export default UserModal;
