import "../styles/cardHover.css"
import instaIcon from "../assets/images/instagram.png"
import fbIcon from "../assets/images/facebook.png"
import budaLogo from "../assets/images/budaLogo.png"
import { useState } from "react";
import MapComponent from "./GoogleMap";
import { Link } from "react-router-dom";

const ContactBar = () => {
    const [info, setInfo] = useState([]);

    return (
        <div className="w-full   bg-gradient-to-r from-indigo-300 to-red-200 flex flex-col items-center" id="contactSection">
            {/* Contact Logo Section */}
            <section className="w-full flex justify-center   border-black border-b-2 bg-white border-double">
                <img className="rounded bg-white p-1 mb-2" width="200" src={budaLogo} alt="buda logo" />
            </section>

            <div className="flex flex-col md:flex-row    w-full h-full  justify-evenly">

                {/* Contact Buda Section */}
                <section className="sm:w-full md:w-full lg:w-1/2 h-full  flex sm:border-0 md:border-r-2 border-black">
                    <div className="flex w-full flex-col">
                        <h1 className="mx-auto mb-2 text-2xl welcome"><strong>Contact BUDA:</strong></h1>
                        <div className="flex justify-center h-6  mb-1">
                            <h3 className="mr-2 text-lg "><em>Socials:</em></h3>
                            <img className="mr-2" width="30" src={fbIcon} alt="facebook icon" />
                            <img width="30" src={instaIcon} alt="instagram icon" />
                        </div>

                        {/* Email Form */}
                        <div className="mb-3">
                            <div className="flex flex-col w-11/12 p-2  rounded mx-auto">
                                <h2 className="flex mx-auto text-xl"><strong>Email:</strong></h2>
                                <form className="w-full flex flex-col" method="POST" action="https://formsubmit.co/urok.dance@gmail.com">

                                    <label className="p-1">Full-Name:</label>
                                    <input className="rounded p-1 " type="text" name="name" required placeholder="First name Last name"></input>

                                    <label className="p-1">Email:</label>
                                    <input className="rounded p-1" type="email" name="email" placeholder="myemail@myemail.com"></input>

                                    <label className="p-1">Message:</label>
                                    <textarea className="rounded px-1 mb-2" rows="8" type="text" name="message" placeholder="Message..." />
                                    <button className="px-7 text-white rounded py-1 bg-indigo-600 w-fit mx-auto" type="submit">Send</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>


                {/* Budda Location Section */}
                <section className="sm:w-full md:w-full lg:w-1/2 mb-3 flex flex-col items-center">
                    <h1 className="text-2xl welcome"><strong>Location:</strong></h1>
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="font-medium mb-2">Address:</h2>
                        <h3>Alma Del Tango Studio</h3>
                        <h5>167 Tunstead Ave, San Anselmo, CA 94960</h5>
                    </div>

                    <div className="flex w-11/12 rounded overflow-hidden">
                        <MapComponent />
                    </div>
                </section>
            </div>
            {/* Thank You Section */}
            <section className="w-full bg-white  border-t-2 p-5 border-black flex flex-col items-center justify-center">
                <h1 >Thank You for choosing BUDA!</h1>
                <h2 >Copyright © Bianca Zogbi All rights reserved.</h2>
            </section>
        </div>
    )
}

export default ContactBar;