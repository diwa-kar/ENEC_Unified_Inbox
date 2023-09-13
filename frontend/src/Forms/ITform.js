import React, { useState } from "react";
//import { Label } from "reactstrap";
import { FormCheck } from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";
import Grid from '@mui/material/Grid';
import { Typography, Radio, RadioGroup,FormControl, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, Snackbar, Alert } from "@mui/material";
// import { Button } from "reactstrap";

const ITform = (props) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [tickettype,setTickettype]= useState('');
    const [hwtype,setHwtype]=useState('');
    const [inch,setInch]= useState('');
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setOpen1(false);
      };
    

    // const [formData, setFormData] = useState({
    //     newComputer: false,
    //     upgradeExisting: false,
    //     usage: {
    //         officeWork: false,
    //         MechanicalEngineeringOrElectronicDesign: false,
    //         SimulationsSoftwareDevelopmentGraphicDesignAndIllustrations: false,
    //         Specialized: false,
    //         LaserFacilitySystem: false,
    //     },
    //     Specification: {
    //         OperatingSystem: {
    //             StandardSystem: false,
    //             LCD24: false,
    //         },
    //         Windows: {
    //             MultiProcessor: false,
    //             LCD34: false,
    //         },
    //         MacOSX: {
    //             Chromebook: false,
    //             DualILCD: false,
    //         },
    //         Linux: {
    //             RAMG8: false,
    //             Other: false,
    //         },
    //     },
    // });

    // const handleNewComputerChange = (event) => {
    //     setFormData({ ...formData, newComputer: event.target.checked });
    // };

    // const handleUpgradeExistingChange = (event) => {
    //     setFormData({ ...formData, upgradeExisting: event.target.checked });
    // };

    // const handleUsageChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         usage: { ...formData.usage, [event.target.name]: event.target.checked },
    //     });
    // };

    // const handleSpecificationChange = (event) => {
    //     const [category, subcategory] = event.target.name.split('.');
    //     setFormData({
    //         ...formData,
    //         Specification: {
    //             ...formData.Specification,
    //             [category]: { ...formData.Specification[category], [subcategory]: event.target.checked },
    //         },
    //     });
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //      // Check if any of the checkboxes are not checked
    //      const newComputerValues = formData.newComputer;
    //      const upgradeExistingValues = formData.upgradeExisting;
    //      const usageValues = Object.values(formData.usage);
    //      const specificationValues = Object.values(formData.Specification);
    //      if (usageValues.includes(true) || specificationValues.includes(true)) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Cannot create the IT request',
    //             text: 'Please select atleast an option to create the IT request',
    //         });
    //         return;
    //      }

    //     try {
    //         const response = await axios.post('http://localhost:5000/add-it-request', formData);
    //         console.log(response.data);
    //         event.target.reset();
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Request Created Successfully',
    //             text: 'Your IT request has been successfully created.',
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const formclick = () => {
        console.log(tickettype,hwtype,inch);
        if(tickettype !=="" && hwtype !==""){
            if(hwtype!=="Monitor"){
                try {
                    axios
                        .get(
                        `http://localhost:8000/qpmc_it_tickets_insert?tickettype=${tickettype}&Hardwaretype=${hwtype}`
                        )
                        .then((response) => {
                        const data = response.data;
                        console.log(data);
                        setTickettype("");
                        setInch("");
                        setHwtype("");
                        })
                        .catch((error) => console.log(`Error in Axios ${error}`));
                    } catch (e) {
                    console.log(e);
                    }
            } else if(hwtype==="Monitor"){
                try {
                    axios
                        .get(
                        `http://localhost:8000/qpmc_it_tickets_insert?tickettype=${tickettype}&Hardwaretype=${hwtype}&monitorsize=${inch}`
                        )
                        .then((response) => {
                        const data = response.data;
                        console.log(data);
                        setTickettype("");
                        setInch("");
                        setHwtype("");
                        })
                        .catch((error) => console.log(`Error in Axios ${error}`));
                    } catch (e) {
                    console.log(e);
                    }
            }
            setOpen(true);
        } else {
            console.log("first")
            setOpen1(true);
        }
    }



    return (
        <>
            <div className="App" style={{
                background: "linear-gradient(to bottom, rgba(130, 0, 0,0.5), rgba(158, 111, 33,0.5), url('https://www.cdegroup.com/getmedia/4489abf9-d22f-4738-b34c-9ce01bbf5317/QPMC-BETWEEN-STOCKPILERS-670x520.jpg?width=670&height=520&ext=.jpg')",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "relative",
            }}>
                {/* <NavbarTop name = " IT Request Form "/> */}
                <div className="form">
                       <div className="row">
                            <div className="col-12 text-center">
                                <Typography variant="h5">Computer Hardware & Software Request Form</Typography>
                            </div>
                        </div>
                        <br />
                        <Grid container>
                            <Grid sx={{display:"flex",alignItems:"end",justifyContent:"end"}} item xs={5}>
                                <Typography sx={{paddingBottom:1, paddingRight:2}} variant="subtitle1">{"Ticket Type:"}</Typography>
                            </Grid>
                            <Grid item xs={7}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={(event)=> {setTickettype(event.target.value);}}
                                >
                                    <FormControlLabel value="Hardware" control={<Radio />} label="Hardware" />
                                    <FormControlLabel value="Software" control={<Radio />} label="Software" />
                                </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid sx={{display:"flex",alignItems:"end",justifyContent:"end"}} item xs={5}>
                                <Typography sx={{ paddingRight:2}} variant="subtitle1">{"Type of Hardware:"}</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <FormControl variant="standard" sx={{ minWidth: 200 }}>
                                    <InputLabel>Select Type</InputLabel>
                                    <Select
                                    value={hwtype}
                                    label="Select Type"
                                    onChange={(event) => {setHwtype(event.target.value);}}
                                    >
                                    <MenuItem value={'Monitor'}>Monitor</MenuItem>
                                    <MenuItem value={'Keyboard'}>Keyboard</MenuItem>
                                    <MenuItem value={'Mouse'}>Mouse</MenuItem>
                                    <MenuItem value={'Printer'}>Printer</MenuItem>
                                    <MenuItem value={'Scanner'}>Scanner</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        {hwtype==="Monitor" ?
                        <Grid container>
                            <Grid sx={{display:"flex",alignItems:"end",justifyContent:"end"}} item xs={5}>
                                <Typography sx={{ paddingRight:2}} variant="subtitle1">{"Monitor Inch:"}</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField label="Inches" variant="standard" onChange={(event)=>{setInch(event.target.value)} } />
                            </Grid>
                        </Grid>
                        :null}
                        <br /><br />
                            <div className="text-center">
                                <Button variant="contained" onClick={formclick}>Submit</Button>
                            </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" elevation={6} sx={{ width: '100%' }}>
                    Ticket is Submitted
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" elevation={6} sx={{ width: '100%' }}>
                    Fill the Required field
                </Alert>
            </Snackbar>
        </>
    )
}

export default ITform;


// <form onSubmit={handleSubmit}>
//                     <div className="form">
//                         <div className="row">
//                             <div className="col-12 text-center">
//                                 <Label className="header">Computer Hardware & Software Request Form</Label><br /><br />
//                             </div>
//                             <div className="col-12">
//                                 <div className="justify-contents-center align-items-center">
//                                     <FormCheck className="formcheck" type="checkbox" name="newComputer" checked={formData.newComputer} onChange={handleNewComputerChange} color="primary" label="New Computer/Laptop" ></FormCheck>
//                                     <FormCheck type="checkbox" name="upgradeExisting" checked={formData.upgradeExisting} onChange={handleUpgradeExistingChange} color="primary" label="Upgrade of an existing Computer/Laptop"></FormCheck><br />
//                                 </div>
//                             </div>
//                             <div className="col-12">
//                                 <Label type="question">How will the new or upgraded computer/laptop be used?</Label>
//                                 <FormCheck type="checkbox" name="officeWork" checked={formData.usage.officeWork} onChange={handleUsageChange} color="primary" label="Office work(email, word processing, spreadsheets, etc)"></FormCheck>
//                                 <FormCheck type="checkbox" name="MechanicalEngineeringOrElectronicDesign" checked={formData.usage.MechanicalEngineeringOrElectronicDesign} onChange={handleUsageChange} color="primary" label="Mechanical Engineering or electronic design"></FormCheck>
//                                 <FormCheck type="checkbox" name="SimulationsSoftwareDevelopmentGraphicDesignAndIllustrations" checked={formData.usage.SimulationsSoftwareDevelopmentGraphicDesignAndIllustrations} onChange={handleUsageChange} color="primary" label="Simulations, Software Development, Graphic Design and Illustrations"></FormCheck>
//                                 <FormCheck type="checkbox" name="Specialized" checked={formData.usage.Specialized} onChange={handleUsageChange} color="primary" label="Specialized(Instrumentation Support, Compact Chassis, Server, etc)"></FormCheck>
//                                 <FormCheck type="checkbox" name="LaserFacilitySystem" checked={formData.usage.LaserFacilitySystem} onChange={handleUsageChange} color="primary" label="Laser facility system"></FormCheck><br />

//                             </div>

//                             <div className="col-12">
//                                 <Label type="question">What Specifications(if any) do you require?</Label>
//                                 <div className="row">
//                                     <div className="col-3">
//                                         <Label type="label">Operating System</Label>
//                                         <FormCheck type="checkbox" name="OperatingSystem.StandardSystem" checked={formData.Specification.OperatingSystem.StandardSystem} onChange={handleSpecificationChange} color="primary" label="Standard System"></FormCheck>
//                                         <FormCheck type="checkbox" name="OperatingSystem.LCD24" checked={formData.Specification.OperatingSystem.LCD24} onChange={handleSpecificationChange} color="primary" label="24''LCD"></FormCheck>
//                                     </div>
//                                     <div className="col-3">
//                                         <Label type="label">Windows</Label>
//                                         <FormCheck type="checkbox" name="Windows.MultiProcessor" checked={formData.Specification.Windows.MultiProcessor} onChange={handleSpecificationChange} color="primary" label="Multi-Processor"></FormCheck>
//                                         <FormCheck type="checkbox" name="Windows.LCD34" checked={formData.Specification.Windows.LCD34} onChange={handleSpecificationChange} color="primary" label="34' LCD"></FormCheck>
//                                     </div>
//                                     <div className="col-3">
//                                         <Label type="label">Mac OS X</Label>
//                                         <FormCheck type="checkbox" name="MacOSX.Chromebook" checked={formData.Specification.MacOSX.Chromebook} onChange={handleSpecificationChange} color="primary" label="Chromebook"></FormCheck>
//                                         <FormCheck type="checkbox" name="MacOSX.DualILCD" checked={formData.Specification.MacOSX.DualILCD} onChange={handleSpecificationChange} color="primary" label="Dual 'LCD"></FormCheck>
//                                     </div>
//                                     <div className="col-3">
//                                         <Label type="label">Linux</Label>
//                                         <FormCheck type="checkbox" name="Linux.RAMG8" checked={formData.Specification.Linux.RAMG8} onChange={handleSpecificationChange} color="primary" label="RAM_G8"></FormCheck>
//                                         <FormCheck type="checkbox" name="Linux.Other" checked={formData.Specification.Linux.Other} onChange={handleSpecificationChange} color="primary" label="Other"></FormCheck>
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="col-12 btn-box">
//                                 <button className="btn btn-success"  style={{ height: "5vh" }}>Create Request</button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>