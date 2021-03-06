import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '50px 30px',
  },
  card: {
    width: '50%',
    marginBottom: '50px',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: '80%',
    },
  },
  media: {
    height: 200,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoItems: {
    display: 'flex',
    flexFlow: 'column',
  },
  items: {
    lineHeight: 2.5,
  },
}));

const StartupProfile = props => {
  const classes = useStyles();
  const { item } = props;

  return (
    <div>
      <div className={classes.header}>
        <h3>Welcome back, {item.name}</h3>
      </div>
      <div className={classes.center}>
        <Card className={classes.card}>
          <CardActionArea>
            ``
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {item.companyName ? item.companyName : 'Not Entered'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {item.missionStatement ? item.missionStatement : 'Not Entered'}{' '}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/startups/profile/${item.id}`}
            >
              <Button size='small'>Edit Profile</Button>
            </Link>
          </CardActions>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Button size='small' color='primary'>
                More Info
              </Button>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.infoItems}>
                <Typography className={classes.items}>
                  Website: {item.website ? item.website : 'Not Entered'}{' '}
                </Typography>
                <Typography className={classes.items}>
                  Location: {item.location ? item.location : 'Not Entered'}{' '}
                </Typography>
                <Typography className={classes.items}>
                  # of Employees:{' '}
                  {item.companySize ? item.companySize : 'Not Entered'}{' '}
                </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
      </div>
    </div>
  );
};

export default StartupProfile;
