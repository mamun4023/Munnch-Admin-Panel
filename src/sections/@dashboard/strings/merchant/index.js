import React, { useEffect, useState } from "react";
import {Typography, Box, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from 'react-redux';
import {FetchMerchantString} from '../../../../redux/strings/merchant/fetch/action';
import {UpdateString} from '../../../../redux/strings/merchant/update/action';

export default function MyComponent() {
  const [policy_value, setPolicyValue] = useState('');
  const [aboutUs, setAboutUs] = useState("");
  const [contactUs, setContactUs] = useState("");
  const [term_condition, setTerm_condition] = useState('');

  const FetchString = ()=>{
    FetchMerchantString()
        .then(res =>{
            const response = res.data.data.merchant_variables_list;
            console.log(response);
            setAboutUs(response[0].value);
            setContactUs(response[1].value);
            setPolicyValue(response[2].value);
            setTerm_condition(response[5].value);
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

    UpdateString(data);
  }

  return (
    <> 
          <Typography variant="h4" gutterBottom>
            Merchant Strings Management 
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
              About Us
            </Typography>
                <ReactQuill 
                  theme="snow" 
                  value={aboutUs} 
                  onChange={setAboutUs}
                />
         </Box>   
          <Box marginTop={5}>   
            <Typography variant="h5" gutterBottom>
             Terms And Conditions
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