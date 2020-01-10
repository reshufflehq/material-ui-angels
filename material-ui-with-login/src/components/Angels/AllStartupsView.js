import '@reshuffle/code-transform/macro';
import React, { useEffect, useState } from 'react';
import {
  getRole,
  getAllStartups,
  archiveStartup,
  vetStartup,
  getAllArchivedStartups,
} from '../../../backend/backend';
import AllStartupsViewTable from './AllStartupsViewTable';
import Error from '../Errors/Error';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const columns = [
  { id: 'companyName', align: 'left', label: 'Company Name', minWidth: 170 },
  { id: 'location', align: 'left', label: 'Location', minWidth: 100 },
  {
    id: 'website',
    label: 'Website',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
  {
    id: 'companySize',
    label: '# of Employees',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
  {
    id: 'missionStatement',
    label: 'Mission Statement',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
];

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  root: {
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '50px',
    padding: '10px',
    margin: '10px',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
    backgroundColor: '#fafafa',
  },
  cellTable: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  addBtn: {
    width: '100px',
    height: '55px',
    fontSize: '16px',
    textTransform: 'uppercase',
    color: '#000',
    background: '#eee !',
    border: '1px solid #000',
    cursor: 'pointer',

    '&:disabled': {
      background: '#d3d3d3 !important',
      cursor: 'default',
      border: '0',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

const AllStartupsView = () => {
  const [users, setUsers] = useState([]);
  const [archivedStartups, setArchivedStartups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const usersRoles = await getRole();

      if (usersRoles.ADMIN) {
        const result = await getAllStartups();
        const users = await getAllArchivedStartups();

        setUsers(result);
        setArchivedStartups(users);
      }

      setRoles(usersRoles);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const archive = async (startup, archieved) => {
    await archiveStartup(startup.id);
    var index = users.indexOf(startup);
    if (index > -1) {
      users.splice(index, 1);
    }
    if (!archieved) {
      setUsers([...users]);
      setErrorMsg('Startup archived.');
      setErrorStatus('success');
      handleClick();
    } else {
      setErrorMsg('Startup unarchived.');
      setErrorStatus('success');
      handleClick();
    }

    return;
  };

  const vettedStartup = async (startup, vetted) => {
    await vetStartup(startup.id);
    if (!vetted) {
      setErrorMsg('Startup vetted.');
      setErrorStatus('success');
      handleClick();
    } else {
      setErrorMsg('Remove vet from startup.');
      setErrorStatus('success');
      handleClick();
    }

    return;
  };

  if (users.length < 1 && archivedStartups.length < 1) {
    return (
      <div className='empty'>
        <div className='empty-icon'>
          <i className='icon icon-people'></i>
        </div>
        <p className='empty-title h5'>No startups to vet or archive :(</p>
      </div>
    );
  }

  return (
    <div>
      <span>
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
      </span>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Startups' {...a11yProps(0)} />

          <Tab label='Archived Startups' {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        {users.length < 1 ? (
          <div className='empty'>
            <div className='empty-icon'>
              <i className='icon icon-people'></i>
            </div>
            <p className='empty-title h5'>
              No startups has been vetted or have all been Archived.
            </p>
          </div>
        ) : (
          <div className={classes.root}>
            <div className={classes.flex}>
              <h2>Startups</h2>
            </div>
            <Grid>
              <div className={classes.tableWrapper}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map(column => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(row => (
                        <AllStartupsViewTable
                          user={row}
                          archived={archive}
                          vett={vettedStartup}
                        />
                      ))}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[1, 5, 25]}
                component='div'
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <div className={classes.root}>
            <div className={classes.flex}>
              <h2>Archived Startups</h2>
            </div>
            <Grid>
              <div className={classes.tableWrapper}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map(column => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {archivedStartups
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(row => (
                        <AllStartupsViewTable
                          user={row}
                          archived={archive}
                          vett={vettedStartup}
                        />
                      ))}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[1, 5, 25]}
                component='div'
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

export default AllStartupsView;