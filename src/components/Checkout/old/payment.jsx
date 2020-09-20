import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';


import PaymentForm from './Payment_Form'
import TransferList from './Transfer_List';

import { useDispatch, useSelector } from 'react-redux';

import PayPalBtn from './Paypal'


const ColorlibConnector = withStyles({
   alternativeLabel: {
      top: 22,
   },
   active: {
      '& $line': {
         backgroundImage:
            'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
   },
   completed: {
      '& $line': {
         backgroundImage:
            'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
   },
   line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
   },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
   root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   active: {
      backgroundImage:
         'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
   },
   completed: {
      backgroundImage:
         'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
   },
});

function ColorlibStepIcon(props) {
   const classes = useColorlibStepIconStyles();
   const { active, completed } = props;

   const icons = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
   };

   return (
      <div
         className={clsx(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed,
         })}
      >
         {icons[String(props.icon)]}
      </div>
   );
}

ColorlibStepIcon.propTypes = {
   /**
    * Whether this step is active.
    */
   active: PropTypes.bool,
   /**
    * Mark the step as completed. Is passed to child components.
    */
   completed: PropTypes.bool,
   /**
    * The label displayed in the step icon.
    */
   icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: '5rem',
      width: '100%',
   },
   button: {
      marginRight: theme.spacing(1),
   },
   instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
}));

function getSteps() {
   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step, paymentHandler, getTotal) {
   switch (step) {
      case 0:
         return (
            <div>
               <PaymentForm getTotal={getTotal}/>
               {/* <TransferList handleLeft={handleLeft} handleRight={handleRight} left={left} right={right} /> */}
            
            </div>
         );
         
      case 1:
         return (
            <div>
               <div>Online Payment Demo</div>
               <PayPalBtn
                  amout={200}
                  currency={'EUR'}
                  OnSuccess={paymentHandler}
               />
            </div>
         );
      case 2:
         return (
            <div>
               <h2>TEST3</h2>
            </div>
         );
      default:
         return 'Unknown step';
   }
}

export default function CustomizedSteppers() {
   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const steps = getSteps();
   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };
   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };
   const handleReset = () => {
      setActiveStep(0);
   };
   const handleStep = (step) => () => {
      setActiveStep(step);
   };


   // const items = useSelector(state => state.items)
   // console.log('items', items)
   // const [left, setLeft] = useState(items);
   // const [right, setRight] = useState([]);
   // console.log('right', right)
   // console.log('left', left)
   // const handleLeft = (data) => {
   //    setLeft({left: data})
   // }
   // const handleRight = (data) => {
   //    setRight({ right: data })
   // }

   const [total, setTotal] = useState([])
   
   

   const getTotal = (data) => {
      setTotal({total: data})
   }

   const paymentHandler = (details, data) => {
      /** Here you can call your backend API
        endpoint and update the database */
      console.log(details, data);
   }

   
   return (
      <div className="container">
      <div className={classes.root}>

         <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
               <Step key={label}>
                  <StepLabel onClick={handleStep(index)}  StepIconComponent={ColorlibStepIcon}>{label}</StepLabel >
               </Step>
            ))}
         </Stepper>


         <div>
            {activeStep === steps.length ? (
               <div>
                  <div className={classes.instructions}>
                     All steps completed - you&apos;re finished
               </div>

                  <Button onClick={handleReset} className={classes.button}>
                     Reset
                  </Button>
               </div>
            ) : (
                  <div>
                     <div className={classes.instructions}>{
                     getStepContent(activeStep, paymentHandler, getTotal)
                     
                     
                     }</div>
                     <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                           Back
                        </Button>
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={handleNext}
                           className={classes.button}
                        >
                           {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                     </div>
                  </div>
               )}
         </div>
      </div>
      </div>
   );
}
