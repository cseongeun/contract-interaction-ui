import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreateIcon from '@material-ui/icons/Create';
import PageviewIcon from '@material-ui/icons/Pageview';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReadTable from 'pages/ContractInteraction/Content/FunctionTable/Read'
import WriteTable from 'pages/ContractInteraction/Content/FunctionTable/Write'
import AdvanceWriteTable from 'pages/ContractInteraction/Content/FunctionTable/MultiWrite';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const FunctionTable: React.FC =  ()  => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
       <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Read" icon={<PageviewIcon />} {...a11yProps(0)} />
          <Tab label="Write" icon={<CreateIcon />} {...a11yProps(1)} />
          <Tab label="Multi Write" icon={<CreateIcon />} {...a11yProps(2)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ReadTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WriteTable/> 
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdvanceWriteTable />
      </TabPanel>
    </Paper>
  );
}

export default FunctionTable
