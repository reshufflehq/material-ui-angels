import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  createOrGetStartup,
  updateStartupProfile,
} from '../../../../backend/backend';
import Error from '../../Errors/Error';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const employeesValues = [
  '0 - 10',
  '11 - 50',
  '51 - 200',
  '201 - 500',
  '501 - 1000',
  '1000+',
];

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#f9f9fa',
    height: '100vh',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      maxWidth: '988px',
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingLeft: '14px',
      paddingRight: '14px',
    },
  },
  header: {
    borderBottom: '1px solid #e7e9eb',
    padding: '56px 0',
    marginBottom: '28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      alignItems: 'center',
      flexFlow: 'column',
    },
  },
  saveBtn: {
    backgroundColor: '#3f81c7',
    borderRadius: '3px',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '14px',
    lineHeight: '21px',
    padding: '7px 26px',
    outline: 'none',
    textDecoration: 'none',
    textAlign: 'center',
    userSelect: 'none',
    color: '#f0f0f0',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      padding: '7px 18px',
      width: '100px',
    },
  },
  body: {
    display: 'flex',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      flexFlow: 'column',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    margin: '0 20px',
    width: '50%',
    display: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '100%',
    },
  },

  columnItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      alignItems: 'flex-start',
      flexFlow: 'column',
    },
  },

  item: {
    boxSizing: 'border-box',
    float: 'left',
    paddingLeft: '14px',
    paddingRight: '14px',
    position: 'relative',
    marginBottom: '14px',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [formProfile, setProfile] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    location: '',
    missionStatement: '',
    phoneNumber: '',
    companySize: 0,
    funded: false,
  });
  const [open, setOpen] = React.useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const user = await createOrGetStartup();

      setProfile(user);

      setForm({
        companyName: user.companyName,
        missionStatement: user.missionStatement,
        website: user.website,
        location: user.location,
        phoneNumber: user.phoneNumber,
        funded: user.funded,
        companySize: user.companySize,
      });
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmits = async event => {
    try {
      event.preventDefault();
      await updateStartupProfile(form);
      setErrorMsg('Saved.');
      setErrorStatus('success');
      handleClick()
      setSubmitted(true);
    } catch (err) {
      setErrorMsg('Please be logged into the right account.');
      setErrorStatus('danger');
      console.error(submitted);
      handleClick()
      setSubmitted(true);
    }
  };

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  if (!formProfile) {
    console.error('Profile is empty!');
  }

  return (
    <div className={classes.container}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Error
          onClose={handleClose}
          variant={errorStatus}
          message={errorMsg}
        />
      </Snackbar>
      <form onSubmit={handleSubmits}>
        <div className={classes.layout}>
          <div className={classes.header}>
            <Typography variant='h6' gutterBottom>
              {form.companyName} / Edit Profile
            </Typography>
            <button
              type='submit'
              variant='contained'
              className={classes.saveBtn}
            >
              Save
            </button>
          </div>
          <div className={classes.body}>
            <div className={classes.column}>
              <div className={classes.columnItem}>
                <div className={classes.item}>
                  <label>Company Name</label>
                </div>
                <div className={classes.item}>
                  <TextField
                    onChange={e => onChange(e)}
                    value={form.companyName}
                    id='companyName'
                    name='companyName'
                    fullWidth
                    variant='outlined'
                  />
                </div>
              </div>
              <div className={classes.columnItem}>
                <div className={classes.item}>
                  <label>Location</label>
                </div>
                <div className={classes.item}>
                  <TextField
                    onChange={e => onChange(e)}
                    value={form.location}
                    id='location'
                    name='location'
                    fullWidth
                    variant='outlined'
                  />
                </div>
              </div>

              <div className={classes.columnItem}>
                <div className={(classes.item, classes.center)}>
                  <label>Mission Statement</label>
                </div>
                <div className={classes.item}>
                  <TextField
                    value={form.missionStatement}
                    onChange={e => onChange(e)}
                    id='missionStatement'
                    name='missionStatement'
                    fullWidth
                    multiline
                    rows='6'
                    variant='outlined'
                  />
                </div>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.columnItem}>
                <div className={(classes.item, classes.center)}>
                  <label># of Employees</label>
                </div>
                <div className={classes.item}>
                  <TextField
                    value={form.companySize}
                    onChange={e => onChange(e)}
                    name='companySize'
                    select
                  >
                    {employeesValues.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className={classes.columnItem}>
                <div className={(classes.item, classes.center)}>
                  <label>Phone Number</label>
                </div>
                <div className={classes.item}>
                  <TextField
                    value={form.phoneNumber}
                    onChange={e => onChange(e)}
                    id='number'
                    name='phoneNumber'
                    fullWidth
                    autoComplete='phone-number'
                    variant='outlined'
                  />
                </div>
              </div>

              <div className={classes.columnItem}>
                <div className={(classes.item, classes.center)}>
                  <label>Website</label>
                </div>
                <div className={classes.item}>
                  <TextField
                    value={form.website}
                    onChange={e => onChange(e)}
                    id='website'
                    name='website'
                    fullWidth
                    variant='outlined'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
