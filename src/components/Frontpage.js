import React, { useState, useRef } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button } from 'react-bootstrap'
import Populars from './Populars'
import '../App.css'
import GoogleButton from 'react-google-button'
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

function Frontpage() {
    const [Search, setSearch] = useState("");
    const [isLoggedin, setisLoggedin] = useState(false)
    const [Name, setName] = useState("")
    const responseGoogle = (response) => {
        if (response.profileObj != null) {
            setisLoggedin(true);
            setName(response.profileObj.name);
        }
        console.log(response);
    }
    console.log(Name);
    return (

        <>

                <Navbar bg="dark" expand="lg" className='navsize'>
                    <Navbar.Brand style={{ fontSize: '2.5rem', paddingRight: '60rem' , color:"white" }} className='navsize'>MoviesVerse</Navbar.Brand>
                    <Form className="d-flex"  >
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-success" >Search</Button>
                    </Form>

                    <div style={{  paddingLeft: '5rem' }}>
                        {
                            !isLoggedin ?
                                <GoogleLogin
                                    clientId="962851586497-9sktg69pd8n33ft3o7p4qc2o29gn6lnq.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                />
                                :
                                <>
                                    <GoogleLogout
                                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                        buttonText="Logout"
                                        onLogoutSuccess={() => setisLoggedin(false)}
                                    >
                                        <div style={{ fontSize: "1.2rem" }}>{Name}</div>
                                    </GoogleLogout>
                                </>
                        }
                    </div>
                </Navbar>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <Populars type={Search} />
        </>

    )
}

export default Frontpage