import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setDark } from './actions/userActions'
import Nav from './Nav'
import { userSession } from './utils'
import { getDark } from './selectors/selectors'

userSession.userSession()

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#48A9A6',
        },
        secondary: {
            main: '#000000',
        },
    },
})

const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#48A9A6',
        },
        secondary: {
            main: '#000000',
        },
    },
})
defaultTheme.typography.h6 = {
    fontSize: '0.9rem',
    '@media (min-width:600px)': {
        fontSize: '0.5rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.4rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.4rem',
    },
}
defaultTheme.typography.h5 = {
    '@media (min-width:600px)': {
        fontSize: '0.9rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
    },
}

const dark = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#000',
        },
    },
})

const App: React.FC = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(getDark)
    return (
        <ThemeProvider theme={isDark ? defaultTheme : dark}>
            <Nav darkTheme={() => dispatch(setDark())} />
        </ThemeProvider>
    )
}

export default App
