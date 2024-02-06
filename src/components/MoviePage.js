import React, { useEffect } from 'react'
import { Navbar, Card, Nav, Container, Row, Col } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
import '../App.css'
import { useState } from 'react'
import { Form, FormControl, Button, Table } from 'react-bootstrap'
import Populars from './Populars'
import '../App.css'
import GoogleButton from 'react-google-button'
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

function MoviePage() {
    const location = useLocation();
    const { title, posterlink, discription, releaseDate, isadlt, votect } = location.state;
    const [isLoggedin, setisLoggedin] = useState(false)
    const [Name, setName] = useState("")
    const [review, setreview] = useState("");
    const [reviewsList, setreviewsList] = useState([])
    const responseGoogle = (response) => {
        if (response.profileObj != null) {
            setisLoggedin(true);
            setName(response.profileObj.name);
        }
        console.log(response);
    }
    async function handleSubmit(e) {
        if (!isLoggedin) {
            alert("Login first to post review");
            return;
        }
        if (review.length <= 5) {
            alert("Review to short");
            return;
        }
        e.preventDefault();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(date);
        const postReq = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify({ title, Name, review, date, time })
        }
        const resp = await fetch("http://localhost:5000/review", postReq);
        setreview("");
    }

    useEffect(() => {
        const getReq = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
        }
        const fetchData = async () => {
            var params = {
                title: title
            }
            const allReviews = await fetch(`http://localhost:5000/search?title=${encodeURIComponent(params.title)}`, getReq);
            const data = await allReviews.json();
            var ct = 0;
            var ar = [];
            data.forEach(element => {
                ar[ct] = [element.Name, element.review , element.time ,  element.date]; ct++;
            });
            setreviewsList(ar);
        }
        fetchData();
        return () => {

        }
    }, [])

    const Example = () =>
        Object.entries(reviewsList).map(([k, v]) => (
            <MDBTableBody>
                <tr key={k}>
                    <td>
                        <div>{reviewsList[k][0]}</div>
                        <div style={{ fontWeight: '1', fontSize: '1rem' }}>{reviewsList[k][1]}</div>
                        <div style={{ fontWeight: '10', fontSize: '0.7rem' }}>{reviewsList[k][2]}  {reviewsList[k][3]} </div>
                    </td>
                </tr>
            </MDBTableBody>
        ));

    console.log(reviewsList);
    return (
        <div>
            <Navbar bg="dark" expand="lg" className='navsize'>
                <Navbar.Brand style={{ fontSize: '2.5rem', color: "white", margin: '0.5rem' }} className='navsize'>MoviesVerse</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav ">
                    <Nav className=" me-auto "  >
                        <div style={{}}>
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
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br>
            </br>
            <br>
            </br>
            <div className='mainbox'>
                <div className='imageBox'>
                    <Card.Img src={posterlink}></Card.Img>
                </div>
                <div className='contentBox'>
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <div>
                            <div style={{ display: 'flex', fontSize: '2.5rem', fontWeight: "70" }}>{title}</div>
                            <div style={{ display: 'flex', fontWeight: "70" }}>
                                {discription}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', fontWeight: "70" }}>
                                <div className="text-muted">ReleaseDate {releaseDate}</div>
                                <div className="text-muted">Parent Guide : {{ isadlt } ? "Yes" : "No"}</div>
                                <div className="text-muted">Popularity : {votect}</div>
                            </div>
                            <br />
                            <div style={{ dispaly: 'flex', fontSize: '2.5rem', fontWeight: "70" }}>Reviews</div>
                            <div style={{ display: 'flex' }}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" value={review} onChange={(e) => setreview(e.target.value)} placeholder="write your reviews..." />
                                    </Form.Group>
                                    <Button onClick={handleSubmit} type='submit' variant="warning">Post!</Button>{' '}
                                </Form>
                            </div>
                        </div>
                        <div style={{ dispaly: 'flex', fontSize: '2.5rem', fontWeight: "70" }}>Recent Reviews</div>
                        <div className='reviewBox'>
                            <Example />
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

export default MoviePage