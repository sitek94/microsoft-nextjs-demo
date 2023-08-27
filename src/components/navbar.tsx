'use client'

import * as React from 'react'

import {useIsAuthenticated, useMsal} from '@azure/msal-react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Navbar() {
  const isAuthenticated = useIsAuthenticated()
  const {instance} = useMsal()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          ACME
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={() => instance.logoutRedirect()}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => instance.loginRedirect()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
