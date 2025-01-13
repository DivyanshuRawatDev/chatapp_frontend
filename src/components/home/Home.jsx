import React from 'react'
import Left from './Left'
import Right from './Right'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{backgroundColor: "#A6CDC6",height:"100vh", width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Box sx={{backgroundColor:"#FBF5E5",height:"85vh",width:"80vw",display:"flex",gap:"20px",alignItems:"center",padding:"15px"}}>
        <Left/>
        <Right/>
      </Box>
    </Box>
  )
}

export default Home;