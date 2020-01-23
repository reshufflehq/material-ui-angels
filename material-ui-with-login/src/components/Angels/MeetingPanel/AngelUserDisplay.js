import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  isUser: {
    marginBottom: '5px',
  },
}));

const AngelUserDisplay = ({ value, column, votes }) => {
  const [userInfo, setUserInfo] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (value) {
          const result = await axios(`/api/admin/angel/${value}`);
          setUserInfo(...result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [value]);

  return (
    <TableCell key={column.id} align={column.align}>
      <div className={classes.cellTable}>{`${
        value ? userInfo?.name : votes.startup.companyName
        }`}</div>
    </TableCell>
  );
};

export default AngelUserDisplay;
