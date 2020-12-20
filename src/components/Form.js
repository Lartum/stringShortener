import React, { useState } from 'react';
import { Button, Collapse, IconButton, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'

function Form() {
    const [ originalString, setOriginalString ] = useState(null)
    const [ shortenedString, setShortenedString ] = useState(null)
    const [ shortString, setShortString ] = useState(null)
    const [ expandedString, setExpanedString ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ closeError, setCloseError ] = useState(true)

    const shortener = () => {
        if( validate(originalString)=== false){
            return
        }

        // Find the existing localstorage Item
        const savedString = JSON.parse(localStorage.getItem('strings')) 
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
        const asciiCodeOfText = originalString.split('').map((word) => word.charCodeAt(0))
        const newCodes = asciiCodeOfText.map((code) => {
            const newCode = code + 1
            return newCode
        })
        const shortened = () => {
        // newCodes.map((code) => String.fromCharCode(code)).join('').slice(0, originalString.length / 2 )
            const editCode = newCodes.map((code) => String.fromCharCode(code)).join('')
            const newcode1 = editCode.slice( 0, originalString.length / 2 )
            const newcode2 = editCode.slice( originalString.length / 2, originalString.length - 1 )
            
            if(savedString){
                const existingShortened = savedString.find((element) => {
                    const [foundString] = Object.keys(element)
                    if(foundString){
                        return foundString
                    }
                    return undefined
                })
    
                if(existingShortened){
                    return newcode2
                }
    
                return newcode1
            }
            return newcode1
        } 


        const strings = { 
            [shortened()]: originalString 
        }

        //If the strings already exists in localstorage then append the current string 
        if(savedString){
            savedString.push(strings)
            localStorage.setItem('strings', JSON.stringify(savedString))
            return setShortenedString(strings)
        }

        localStorage.setItem('strings', JSON.stringify([strings]))
        return setShortenedString(strings)
    }


const expander = () => {
        if( validate(shortString) === false) {
                return
            }
        const savedStrings = JSON.parse(localStorage.getItem('strings')) 
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
            <form>
            <TextField 
            id='originalString'
            variant='outlined'
            onChange={(e) => setOriginalString(e.target.value)}
            />
            <Button
            onClick={shortener}
            >Convert</Button>
            <div>
            </div>
            </form>

            <form>
            <TextField 
            id='shortenedString'
            variant='outlined'
            onChange={(e)=> setShortString(e.target.value)}
            />
            <Button
            onClick={expander}
            >Convert</Button>
            </form>
                { shortenedString ? <Typography>Shortened String: { Object.keys(shortenedString) }</Typography> : <></>}
                { expandedString ? <Typography>Expanded String: { Object.values(expandedString) }</Typography> : <></>}
        </div>
    );
}

export default Form;