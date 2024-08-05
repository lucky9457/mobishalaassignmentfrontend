
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner'
import { ColorRing, Circles, BallTriangle } from 'react-loader-spinner'

import { useNavigate, Link } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import './LandingPage.css';
import { useContext, useEffect, useState } from 'react';


import { MdMenu } from "react-icons/md";

import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";




const LandingPage = () => {
    const navigate = useNavigate();
    const [authUsers, setAuthUsers] = useState(null);
    const [authSubadmins, setAuthSubadmins] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const currentYear = new Date().getFullYear();
    // const [category,setCategory]=useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [signInModal, setSignInModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    //register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // const videoRef=useRef();
    const footerItems = [
        { header: "Wizzmedia", subHeaders: [{ title: "About Us", path: "" }] },
        { header: "Office", subHeaders: [{ title: "Head Office", path: "" }, { title: "Branch Office", path: "" },] },
        { header: "Quick Links", subHeaders: [{ title: "Blog", path: "" }, { title: "Admin", path: "" }, { title: "Careers", path: "" }] },
        { header: "Legal Stuff", subHeaders: [{ title: "Privacy Policy", path: "/privacy-policy" }, { title: "Terms of Service", path: "/terms-conditions" }, { title: "Refunds", path: "/refunds" }, { title: "Disclaimer", path: "/disclaimer" },] },
    ]




    const h3Style = {
        fontSize: '1.31em', /* Typical font-size for h3 */
        fontWeight: 'bold', /* h3 is typically bold */
        marginTop: '1em', /* Top margin for spacing */
        marginBottom: '1em', /* Bottom margin for spacing */
        lineHeight: '1.25', /* Adjust line-height for readability */
        cursor: 'pointer', /* Add cursor pointer to indicate clickability */
    };




    const successregister = async credentialResponse => {
        setLoading(true)
        console.log(credentialResponse.credential);
        const token = credentialResponse.credential
        const decoded = await jwtDecode(token);
        console.log(decoded)
        localStorage.setItem("profile", JSON.stringify(decoded))
        const { email, name } = decoded
        console.log(email, name, "aaaa")
        setUsername(email)
        setPassword(name)
        try {

            const response = await axios.post("https://legai.onrender.com/register", {
                "username": email,
                "password": name,
            });
            setMessage(response.data.message);
            toast.success(response.data && response.data.message);
            if (response.data.message == "User registered successfully") {
                try {

                    const response = await axios.post("https://legai.onrender.com/login", {
                        "username": email,
                        "password": name,
                    });
                    console.log(response)
                    Cookies.set("token", response.data.token, { expires: 7 });
                    setMessage("User logged in successfully!");
                    navigate("/voiceAi");
                } catch (error) {
                    toast.error(`Error: ${error.response?.data?.error || "Network Error"}`);
                    setMessage(`Error: ${error.response?.data?.error || "Network Error"}`)
                } finally {
                    setLoading(false);
                    setUsername("")
                    setPassword("")

                }
            }
            setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds

        } catch (error) {
            toast.error(`Error: ${error.response?.data?.error || error.message}`);
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoading(false);
            setUsername("");
            setPassword("");
        }
    }


    const successlogin = async credentialResponse => {
        setLoading(true)
        console.log(credentialResponse.credential);
        const token = credentialResponse.credential
        const decoded = jwtDecode(token);
        console.log(decoded)
        localStorage.setItem("profile", JSON.stringify(decoded))
        const { email, name } = decoded
        console.log(email, name, "aaaa")

        try {


            const response = await axios.post("https://legai.onrender.com/login", {
                "username": email,
                "password": name,
            });
            console.log(response)
            Cookies.set("token", response.data.token, { expires: 7 });
            setMessage("User logged in successfully!");
            toast.success("User logged in successfully!")
            navigate("/voiceAi");
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.error || "Network Error"}`);
            setMessage(`Error: ${error.response?.data?.error || "Network Error"}`);
        } finally {
            setLoading(false);
            setUsername("")
            setPassword("")
        }
    }



    return (
        <>
            <div className="landing-container" >
                {<div className="navbar-landing">
                    <div className='navbar-left'>
                        <p onClick={() => { navigate('/') }} style={h3Style}>LegAI</p>
                        <p onClick={() => { navigate('/') }}>Home</p>
                        <p>About</p>
                        <p onClick={() => { setIsPlaying(p => !p) }}>Business</p>
                    </div>
                    <div className='navbar-right'>
                        <p>Help</p>
                        <button className='landing-signup-btn' onClick={() => { setShowModal(true) }}>Sign Up</button>
                    </div>
                </div>}
                <div className="navbar-landing-mobile">
                    <div className='navbar-left'>
                        <h3 onClick={() => { navigate('/voiceAi') }}>Wizzmedia</h3>
                    </div>
                    <div className='navbar-right'>
                        {/* <p>Help</p> */}
                        <button className='landing-signup-btn' onClick={() => { setShowModal(true) }}>Sign Up</button>
                        {showDrawer ? <ImCross onClick={() => { setShowDrawer(false) }} className='navbar-mobile-menu-icon' /> : <MdMenu onClick={() => { setShowDrawer(true) }} className='navbar-mobile-menu-icon' />}
                    </div>
                </div>

                {/* page1 */}
                <div className='landing-container-page36'>
                    <div className='super-inner-left-36'>

                        <div className='header-align'>
                            <h1 className='landing-header' >
                                Research and Analysis
                            </h1>
                            <h1 className='landing-header'>
                                AI-Powered Legal Research
                            </h1>
                            <h1 className='landing-mobile-header'>Igniting Brands with AI Innovation</h1>
                        </div>
                        <div className='description-align36'>
                            <h3 className='landing-header'>
                                Efficiently search and analyze vast databases of legal documents,
                            </h3>
                            <h3 className='landing-header'> case law, and statutes with AI-driven tools.</h3>
                            <h3 className='landing-mobile-header'> Efficiently search and analyze vast databases of legal documents, case law, and statutes with AI-driven tools.
                            </h3>
                        </div>

                        {/* <h3 className='landing-description highligt-gold'> Start your journey with us today and watch your business thrive in the digital landscape!</h3> */}
                        {/* <h3 className='business-login-txt'>Business Login</h3> */}
                        <div className='landing-btns36'>
                            {/* <a href="https://web.whatsapp.com/send/?phone=9972968390&text=i want to buy your services" target="_blank_" className='talk-wrapper'> */}
                            <button className='start-now-btn' onClick={() => { setShowModal(true) }}>Start Now</button>
                            {/* </a>  */}
                            {/* <button className='sign-in-btn' onClick={()=>{handleBusiness()}}>Already have an Account? Sign in</button> */}
                            <button className='sign-in-btn' onClick={() => { setSignInModal(true) }}>Already have an Account? Sign in</button>
                        </div>
                        {/* <button onClick={()=>{handleBusiness()}} className='google-btn'>
                        <img src="google.png" alt="google" className='googleImage2'/>
                        <h3>Sign in with Google</h3>
                    </button>
                    <a href="https://web.whatsapp.com/send/?phone=9972968390&text=i want to buy your services" target="_blank_" className='talk-wrapper'>
                        <button className='talk-to-us2' >
                            <img src="whatsapp-icon.png" alt="whatsapp-icon" className='whatsapp-icon'/>
                        <p className=''>Talk to Us</p> 
                        </button>
                    </a> */}
                    </div>
                    <div className='super-inner-right'>
                        <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722762669/Task%20internship/legai1_qo5xfj.png" className='super-inner-image' alt="landin-imag" />
                    </div>
                </div>
                {/* page2 */}
                <div className='landing-container-page7' >
                    <div className='super-inner-right'>
                        <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722761545/Task%20internship/legai2_griihx.jpg" className='super-inner-image-page2' alt="landin-imag" />
                    </div>
                    <div className='super-inner-left'>
                        {/* <img src="wizmedia.png" alt="wizz media" className='wizzmedia-landing'/> */}
                        <div className='header-align'>
                            <h1 className='landing-header' >
                                Document Management
                            </h1>
                            <h1 className='landing-header' >
                                Intelligent Document Review
                            </h1>
                            <h1 className='landing-mobile-header'>Document Management</h1>
                        </div>

                        <div className='description-align7'>
                            <h3 className='landing-header'>
                                Automate the review and analysis of legal documents,
                            </h3>
                            <h3 className='landing-header'> identifying key information and streamlining due diligence.</h3>
                            <h3 className='landing-mobile-header'>Automate the review and analysis of legal documents, identifying key information and streamlining due diligence.
                            </h3>
                        </div>
                        <div className='landing-btns7'>
                            <button className='start-now-btn2' onClick={() => { setShowModal(true) }}>Get Started</button>
                            <button className='sign-in-btn'>Check out our solutions</button>
                        </div>

                    </div>
                </div>

                {/* page3 */}
                {/* <div className='landing-container-page3' style={{backgroundColor:"#0d0d0d",color:"#fff"}}>
                <div className='super-inner-left'>
                    
                    <div className='header-align'>
                        <h1 className='' style={{marginTop:"40px",marginBottom:"0px",paddingTop:"0px",marginLeft:"76px",fontSize:"55px"}}>
                        WhatsApp &
                        </h1>
                        <h1 style={{marginTop:"0px",marginBottom:"0px",paddingTop:"0px",marginLeft:"76px",fontSize:"55px"}}>
                        Email Marketing
                        </h1>
                    </div>
                    
                    <div className='description-align'>
                        <h3  style={{marginLeft:"80px",marginBottom:"0px", fontWeight:500}}>
                        Engage customers with personalized messages and promotions </h3>
                        <h3 style={{marginLeft:"-13px",marginBottom:"4px",paddingLeft:"0px", fontWeight:500}}>through WhatsApp messaging and email campaigns. </h3> 
                    </div>
                    <div className='landing-btns3'>
                            <button className='start-now-btn3' onClick={()=>{setShowModal(true)}}>Get Started</button>
                            <button className='sign-in-btn'style={{marginLeft:"6%"}} >Check out our solutions</button>
                    </div>
                </div>
                <div className='super-inner-right'>
                    <img src ="wmarketing.jpeg" className='super-inner-image2' alt="landin-imag-page3" style={{marginLeft:"10px"}}/>
                </div>
            </div> */}
                {/* page30 */}
                <div className='landing-container-page6' >
                    <div className='super-inner-left'>

                        <div className='header-align'>
                            <h1 className='landing-header'>
                                Client Interaction
                            </h1>
                            <h1 className='landing-header'>
                                AI-Driven Client Management
                            </h1>
                            <h1 className='landing-mobile-header'>WhatsApp & Email Marketing</h1>
                        </div>

                        <div className='description-align6'>
                            <h3 className='landing-header'>
                                Track interactions, manage communications,
                            </h3>
                            <h3 className='landing-header'>and gain insights to enhance client relationships </h3>
                            <h3 className='landing-mobile-header'>Track interactions, manage communications, and gain insights to enhance client relationships.
                            </h3>
                        </div>
                        <div className='landing-btns6'>
                            <button className='start-now-btn3' onClick={() => { setShowModal(true) }}>Get Started</button>
                            <button className='sign-in-btn' >Check out our solutions</button>
                        </div>
                    </div>
                    <div className='super-inner-right'>
                        <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722761545/Task%20internship/legai3_lvztwc.jpg" className='super-inner-image2' alt="landin-imag-page3" style={{ marginLeft: "10px" }} />
                    </div>
                </div>

                {/* page4 */}
                {/* <div className='landing-container-page4' style={{backgroundColor:"#0d0d0d",color:"#fff"}}>
                <div className='super-inner-right'>
                    <img src ="socialmedia.jpeg" className='super-inner-image4' alt="landin-imag"/>
                </div>
                <div className='super-inner-left'>
                   
                    <div className='header-align'>
                        <h1 className='' style={{marginTop:"40px",marginBottom:"0px",paddingTop:"0px",marginLeft:"7px",fontSize:"55px"}}>
                        Digital & Social 
                        </h1>
                        <h1 style={{marginTop:"0px",marginBottom:"0px",paddingTop:"0px",marginLeft:"9px",fontSize:"55px"}}>
                        Media Management
                        </h1>
                    </div>
                  
                    <div className='description-align'>
                        <h3  style={{marginLeft:"11px",marginBottom:"0px", fontWeight:500}}>
                        Enhance brand presence and engagement across digital platforms</h3>
                        <h3 style={{marginLeft:"8px",marginBottom:"4px",paddingLeft:"0px", fontWeight:500}}>through strategic content creation and community management. </h3> 
                    </div>
                    <div className='landing-btns4'>
                            <button className='start-now-btn4' onClick={()=>{setShowModal(true)}}>Get Started</button>
                            <button className='sign-in-btn'style={{marginLeft:"6%"}} >Check out our solutions</button>
                    </div>
                 
                </div>
                
            </div> */}
                <div className='landing-container-page7' >
                    <div className='super-inner-right'>
                        <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722761546/Task%20internship/legai4_i3qoxm.jpg" className='super-inner-image4' alt="landin-imag" />
                    </div>
                    <div className='super-inner-left'>
                        {/* <img src="wizmedia.png" alt="wizz media" className='wizzmedia-landing'/> */}
                        <div className='header-align'>
                            <h1 className='landing-header' >
                                Communication

                            </h1>
                            <h1 className='landing-header'>
                                - AI Voice Bot for Legal Services
                            </h1>
                            <h1 className='landing-mobile-header'>Communication
                                - AI Voice Bot for Legal Services</h1>
                        </div>

                        <div className='description-align7'>
                            <h3 className='landing-header'>
                                Offer seamless voice-based assistance for scheduling,
                            </h3>
                            <h3 className='landing-header'>inquiries, and case updates through natural language processing.</h3>
                            <h3 className='landing-mobile-header'>
                                Offer seamless voice-based assistance for scheduling, inquiries, and case updates through natural language processing.
                            </h3>
                        </div>
                        <div className='landing-btns7'>
                            <button className='start-now-btn4' onClick={() => { setShowModal(true) }}>Get Started</button>
                            <button className='sign-in-btn' >Check out our solutions</button>
                        </div>

                    </div>

                </div>
                {/* page6 */}
                <div className='landing-container-page6'>
                    <div className='super-inner-left'>
                        {/* <img src="wizmedia.png" alt="wizz media" className='wizzmedia-landing'/> */}
                        <div className='header-align'>
                            <h1 className='landing-header'>
                                Efficiency and Productivity

                            </h1>
                            <h1 className='landing-header'>
                                - Automated Workflow Integration
                            </h1>
                            <h1 className='landing-mobile-header'>Efficiency and Productivity
                                - Automated Workflow Integration</h1>
                        </div>

                        <div className='description-align6'>
                            <h3 className='landing-header'>
                                Integrate AI tools to optimize and automate repetitive tasks, </h3>
                            <h3 className='landing-header'> improving overall operational efficiency and productivity. </h3>
                            <h3 className='landing-mobile-header'>
                                Integrate AI tools to optimize and automate repetitive tasks, improving overall operational efficiency and productivity.</h3>
                        </div>
                        <div className='landing-btns6'>
                            <button className='start-now-btn5' onClick={() => { setShowModal(true) }}>Get Started</button>
                            <button className='sign-in-btn' style={{ marginTop: "3px", paddingBottom: "2px", height: "32px" }} >Check out our solutions</button>
                            {/* <hr className='sign-in-line'/> */}
                        </div>

                    </div>
                    <div className='super-inner-right'>
                        <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722761546/Task%20internship/legai5_c1b3bb.jpg" className='super-inner-image6' alt="landin-imag" />
                    </div>
                </div>

                <div className='landing-footer'>
                    <div className='footer-items'>
                        {footerItems.length > 0 &&
                            footerItems.map((data, index) => (
                                <div className='footer-col'>
                                    <h3>{data.header}</h3>
                                    <div className='footer-col-item'>
                                        {data.subHeaders.map((dat, inde) => (
                                            <p onClick={() => { dat.title === "Admin" ? setAddress("") : navigate(dat.path) }}>{dat.title}</p>
                                        ))}
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                    <div className='footer-bottom'>
                        <p className="copyright">
                            Copyright © {currentYear} Legalee Ai. All Rights Reserved.
                        </p>
                    </div>

                </div>
            </div>

            {showModal &&
                <div className='signUpForm'>
                    <div className='signUpInner'>
                        {loading ? <div className='loading-container'>
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /> </div> : <>
                            <div className='modal-header'>
                                <h2 style={{ color: "#363534", marginLeft: '0px', fontSize: "20px" }}>Sign Up</h2>
                                <ImCross style={{ cursor: "pointer" }} onClick={() => { setShowModal('') }} />
                            </div>
                            <hr />
                            {/* <label className="labels"> Name</label>
                    <input type="text" className="landingInput" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}} /> */}
                            {/* <label className="labels">Business Name</label> */}
                            {/*
                        <input type="text" className="landingInput" placeholder="Enter Business name" value={businessName} onChange={(e) => { setBusinessName(e.target.value) }} />

                        {/* <label className="labels">Mobile Number</label> 
                        <input type="text" className="landingInput" placeholder="Enter Business number" value={number} onChange={(e) => setNumber(e.target.value)} />
                         <label className="labels">City</label> 
                        <input type="text" className="landingInput" placeholder="Enter City" value={address} onChange={(e) => setAddress(e.target.value)} />
                         <label className="labels">Google Login</label> */}
                            <div>
                                <GoogleLogin
                                    className="google-signup-container"
                                    onSuccess={successregister}
                                    onError={() => {
                                        console.log('Login Failed');
                                        alert("failed to login")
                                    }}
                                />
                            </div>
                            <Link to={`https://web.whatsapp.com/send/?phone=9972968390&text=I would like to learn more about Wizzmedia Marketing Services. My name is ${businessName}`} target="_blank_" className='taltousClass talk-wrapper google-signup-container' style={{ marginTop: '7px' }}>
                                <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722837791/Task%20internship/497f5747-7b97-4a71-be27-7d3ef1f5f4cc.png" alt="google" className='signup-google-image' />
                                <p>Talk to Us</p>
                            </Link>
                            {message && <p className="floating-message-login">{message}</p>}
                            {/* <input type="text" className="landingInput" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} /> */}
                            {/* <label className="labels">Category</label>
                    <input type="text" className="landingInput" placeholder="Enter category" value={category} onChange={(e)=>setCategory(e.target.value)} /> */}

                            {/* <button className="landing-modal-submit" onClick={()=>{}}>Submit</button> */}
                        </>}
                    </div>
                </div>
            }
            {signInModal &&
                <div className='signInForm'>
                    <div className='signInInner'>
                        {loading ? <div className='loading-container'>
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /> </div> : <>
                            <div className='modal-header'>
                                <h2 style={{ color: "#363534", marginLeft: '0px', fontSize: "25px" }}>Sign In</h2>
                                <ImCross style={{ cursor: "pointer" }} onClick={() => { setSignInModal('') }} />
                            </div>
                            <hr />
                            <div className='google-signIn-container' onClick={() => { "" }}>
                                <GoogleLogin

                                    onSuccess={successlogin}
                                    onError={() => {
                                        console.log('Login Failed');
                                        alert("failed to login")
                                    }}
                                />
                            </div>

                            <Link to={`https://web.whatsapp.com/send/?phone=9972968390&text=I would like to learn more about Wizzmedia Marketing Services. My name is ${businessName}`} target="_blank_" className='taltousClass talk-wrapper google-signup-container' style={{ marginTop: '7px' }}>
                                <img src="https://res.cloudinary.com/dcwxu3d5g/image/upload/v1722837791/Task%20internship/497f5747-7b97-4a71-be27-7d3ef1f5f4cc.png" alt="google" className='signup-google-image' />
                                <p>Talk to Us</p>
                            </Link>
                            {message && <p>{message}</p>}
                        </>}
                    </div>
                </div>
            }
            {isPlaying &&
                <div className="landingbusiness-video-container">
                    <div className='video-container'>
                        <div className='video-top'>
                            <IoCloseSharp className='close-video-icon' onClick={() => { setIsPlaying(false) }} />
                        </div>
                        <video controls className='wiz-video' autoPlay={isPlaying}>
                            <source src="https://res.cloudinary.com/dswjg0rjx/video/upload/v1720031516/Wizmedia-video_sb0cmi.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            }
            {
                showDrawer &&
                <div className={`drawer-container ${showDrawer ? 'show-drawer' : ''}`}>
                    <div className='drawer-items'>
                        <p>Home</p>
                        <p>About</p>
                        <p onClick={() => { setShowDrawer(false); setIsPlaying(p => !p) }}>Business</p>

                    </div>
                </div>
            }
        </>
    )
}

export default LandingPage;