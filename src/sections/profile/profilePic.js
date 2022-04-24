import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Grid, Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function ActionAreaCard() {
    const[image, setImage] = useState()
    const Input = styled('input')({
        display: 'none',
      });
    
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }

    return (
            <Grid
                container
                // item xs={8} 
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '60vh' }}
            >

                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <Avatar 
                            alt="Remy Sharp" 
                            src="/static/images/avatar/1.jpg"
                            style={{ height : "300px", width : "300px" }}
                        />
                        <CardContent>
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
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
    );
}
