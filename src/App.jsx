import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // Import Day.js
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const initialFormState = {
    topic: "",
    agenda: "",
    type: 1,
    duration: 60,
    start_time: null,
    email: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  let emailList = [
    "vijay@mailinator.com",
    "ajith@mailinator.com",
    "suriya@mailinator.com",
    "karthi@mailinator.com",
    "Dhanush@mailinator.com",
  ];

  // Function to handle dynamic style
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // Function to handle change dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle email selection change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      email: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Function to handle date change
  const handleDateChange = (newValue) => {
    console.log("🚀 ~ handleDateChange ~ newValue:", newValue);
    if (newValue && dayjs(newValue).isValid()) {
      const formattedDate = dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss[Z]");
      setFormData((prevData) => ({ ...prevData, start_time: newValue }));
    } else {
      console.error("Invalid date format:", newValue);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/api", formData);
      if (res.data) {
        setFormData(initialFormState);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // Ensures it overlays other content
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {
        <>
          <Typography className="top_heading" variant="h2" gutterBottom>
            Techno Consulting Training Session
          </Typography>
          <div className="center">
            <Typography className="heading" variant="h4" gutterBottom>
              Setup the Zoom Meeting for Training
            </Typography>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 2, width: "45ch" } }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="parent_div">
                <div className="child_div1">
                  <TextField
                    id="outlined-topic"
                    label="Topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                  <TextField
                    id="outlined-agenda"
                    label="Agenda"
                    name="agenda"
                    value={formData.agenda}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ width: "400px" }}
                  />
                </div>
                <div className="child_div2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Time"
                      value={formData.start_time}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ width: "500px" }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="email-select-label">
                      Select email
                    </InputLabel>
                    <Select
                      labelId="email-select-label"
                      id="email-select"
                      multiple
                      value={formData.email}
                      onChange={handleEmailChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                      sx={{ width: "300px" }}
                    >
                      {emailList.map((name, index) => (
                        <MenuItem
                          key={index}
                          value={name}
                          style={getStyles(name, formData.email, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <Button variant="contained" type="submit">
                click here to send zoom link
              </Button>
            </Box>
          </div>
        </>
      }
    </>
  );

  // return (

  // );
}

export default App;
