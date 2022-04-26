import React, { useEffect, useState } from "react";
import { toast } from "material-react-toastify";
import {Typography, Box, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from 'react-redux';
import {FetchUserString} from '../../../../redux/strings/user/fetch/action';
import {UpdateString} from '../../../../redux/strings/user/update/action';

export default function MyComponent() {
  const [policy_value, setPolicyValue] = useState('');
  const [aboutUs, setAboutUs] = useState("");
  const [contactUs, setContactUs] = useState("");
  const [term_condition, setTerm_condition] = useState('');

  const FetchString = ()=>{
    FetchUserString()
        .then(res =>{
            const response = res.data.data.user_variables_list;
            console.log(response);
            setAboutUs(response[0].value);
            setContactUs(response[1].value);
            setPolicyValue(response[2].value);
            setTerm_condition(response[3].value)
          })
  }

  useEffect(()=>{
    FetchString();
  },[])

  const UpdateHandler = ()=>{
    
    const data =  {
      "data": [
          {
              "name": "about_us",
              "value": aboutUs
          },
          {
            "admin_id": 1,
            "name": "terms_and_conditions",
            "value": term_condition
          },
          {
              "name": "privacy_policy",
              "value": policy_value
          }
      ]
  }
    
      UpdateString(data)
        .then(res =>{
          const response = res.data.message;
          console.log(response);
          toast.dark(response);
        })
        .catch((err)=>{
          const response = err.response.message;
          toast.dark(response);
        })

  }

  return (
    <> 
          <Typography variant="h4" gutterBottom>
             User Strings Management 
          </Typography>
          <Box
              textAlign= "right"
              margin = {3}
             
          >
            <Button 
              variant="contained"
              onClick={UpdateHandler}
              >Save</Button>
          </Box>

          <Box> 
          <Typography variant="h5" gutterBottom>
            Privacy Policy
          </Typography>
            
              <ReactQuill 
                theme="snow" 
                value={policy_value} 
                onChange={setPolicyValue}
              />
          </Box>

           <Box marginTop={5}>   
            <Typography variant="h5" gutterBottom>
              About US
            </Typography>
          
                <ReactQuill 
                  theme="snow" 
                  value={aboutUs} 
                  onChange={setAboutUs}
                />
         </Box>   
          <Box marginTop={5}>   
            <Typography variant="h5" gutterBottom>
              Terms and Condition
            </Typography>
          
                <ReactQuill 
                  theme="snow" 
                  value={term_condition} 
                  onChange={setTerm_condition}
                />
         </Box>   
    </>
  );
}