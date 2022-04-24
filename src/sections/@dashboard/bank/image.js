import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
    display: 'none',
  });

  
function ImageUpload() {
    const[image, setImage] = useState()

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }

      console.log(image)
      
    return(
            <>
                <Typography variant="h4" gutterBottom>
                    Upload Image
                </Typography>
                <Stack alignItems= "center" >
                    <Stack direction="row" alignItems="center" >
                        <label htmlFor="icon-button-file">
                            <Input onChange={onImageChange} accept="image/*" id="icon-button-file" type="file" />
                            <IconButton
                                
                                color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera style={{ fontSize : "100px"}} />
                            </IconButton>
                        </label>
                        </Stack>
                </Stack>    

            </>
        );
}

export default ImageUpload;

