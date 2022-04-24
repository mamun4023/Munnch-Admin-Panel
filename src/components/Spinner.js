import {CircularProgress, Stack} from '@mui/material';

function Spinner(){
    return(
        <>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                margin={15}
                spacing={2}  
            > 
                <CircularProgress color='primary' /> 
            </Stack>
        </>
    )
}

export default Spinner;