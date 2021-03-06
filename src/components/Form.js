import React, { useState } from 'react';
import { Button, Collapse, IconButton, TextField, Typography, makeStyles, Paper, Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'



const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

function Form() {
    const [ originalString, setOriginalString ] = useState(null)
    const [ shortenedString, setShortenedString ] = useState(null)
    const [ shortString, setShortString ] = useState(null)
    const [ expandedString, setExpanedString ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ closeError, setCloseError ] = useState(true)

    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length

    const shortener = () => {
        if( validate(originalString)=== false){
            return
        }

        // Find the existing localstorage Item
        const savedString = JSON.parse(localStorage.getItem('stringsCollection')) 
        if(savedString){
        const existingString = savedString.find((element) => {
            const [foundElement] = Object.values(element)
            if(foundElement === originalString){
                return foundElement
            }
            return undefined
        })

        if(existingString) {
            return setShortenedString(existingString)
            }
        }
        // If no existing localstorage is found proceed with this logic

        const shortened = newShorten(originalString)
        const strings = { 
            [shortened]: originalString 
        }

        //If the strings already exists in localstorage then append the current string 
        if(savedString){
            savedString.push(strings)
            localStorage.setItem('stringsCollection', JSON.stringify(savedString))
            return setShortenedString(strings)
        }

        localStorage.setItem('stringsCollection', JSON.stringify([strings]))
        return setShortenedString(strings)
    }

const newShorten = (string) => {
    const trimmedString = string.trim()
    const stringLength = trimmedString.length
    const savedString = JSON.parse(localStorage.getItem('stringsCollection')) 
    const stringArray = trimmedString.split('')
    const result = stringArray.map((word) => characters.charAt(Math.floor(Math.random() * charactersLength)))
    const shortenedString = result.splice(0 , stringLength/2).join("")
    if(savedString){
        const sameString = savedString.find((element) => {
            const [elmentKey] = Object.keys(element)
            if(elmentKey === shortenedString){
                return true
            }
            return undefined
        })
        if(sameString){
            newShorten(string)
        } else {
            return shortenedString
        }
    }  
   return shortenedString
}


const expander = () => {
        if( validate(shortString) === false) {
                return
            }
        const savedStrings = JSON.parse(localStorage.getItem('stringsCollection')) 
        if(!savedStrings){
            setCloseError(false)
            return setError('no matches found')
        }
       const existingString = savedStrings.find((element) => { 
       const [foundElement] = Object.keys(element)
        if(foundElement === shortString){
            return foundElement
        }
        return undefined
       })

       if(existingString){
            return setExpanedString(existingString)
       }
       return setError('No match for the entered string')
    }


    const validate = (string) => {
        if(!string){
            setError('Field cannot be empty')
            setCloseError(false)
            return false
        }
        return true

    }

    const classes = useStyles()
    return (
        <div>
            <Collapse
            in={!closeError}
            >
                <Alert
                severity='error'
                action={
                    <IconButton
                    color='inherit'
                    size='small'
                    onClick={()=> setCloseError(true)}
                    >
                        <CloseIcon fontSize='inherit'/>
                    </IconButton>
                }
                >
                    { error }
                </Alert>
            </Collapse>

            <div className={classes.root}>
            <form>
            <TextField 
            id='originalString'
            label='Long'
            variant='outlined'
            color='primary'
            onChange={(e) => setOriginalString(e.target.value)}
            />
            <Button
            variant='contained'
            color='primary'
            onClick={shortener}
            >Convert</Button>
            <div>
            </div>
            </form>

            <form>
            <TextField 
            label='Short'
            id='shortenedString'
            variant='outlined'
            color='primary'
            onChange={(e)=> setShortString(e.target.value)}
            />
            <Button
            variant='contained'
            color='primary'
            onClick={expander}
            >Convert</Button>
            </form>
            </div>
                { shortenedString ? <Paper> 
                    <Typography>
                        Shortened String: <Box color='warning.main'>{ Object.keys(shortenedString) }</Box> 
                        Entered String: <Box color='warning.main'>{ originalString }</Box>
                    </Typography></Paper>: <></>}
                { expandedString ? <Paper> 
                    <Typography>
                        Expanded String: <Box color='info.main'> { Object.values(expandedString) }</Box> 
                        Entered String: <Box color='info.main'>{ shortString }</Box>
                        </Typography></Paper> : <></>}
        </div>
    );
}

export default Form;