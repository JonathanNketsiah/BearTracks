import React from 'react';
import Avatar from '@mui/material/Avatar';
import Bear from './Assets/bearprofile.jpg'
import Jane from './Assets/Jane.jpg'
import John from './Assets/John.jpg'
import Mary from './Assets/Mary.jpg'
import Travis from './Assets/Travis.jpg'
//import defaultAvatar from './Assets/defaultAvatar.png'
import "./css/LoginFront.css";


const Social = () => {



    return (
        <>

            <div className="socialContainer">
                <h2>Friend's List</h2>
                <div className="socialCards">
                    <div className="pborder">
                        <Avatar className="imgDp" sx={{ width: 100, height: 100 }} src={Jane} />
                    </div>
                    <div className="contents">
                        <div className="textDoc">
                            <h5>Jane lane</h5>
                            <label>Interest: Soccer,Bowling , Fahsion</label>
                            <label> Recent visit: SCAD Musuem</label>
                        </div>
                    </div>

                </div>

                <div className="socialCards">
                    <div className="pborder">
                        <Avatar className="imgDp" sx={{ width: 100, height: 100 }} src={John} />
                    </div>
                    <div className="contents">
                        <div className="textDoc">
                            <h5>John Henry</h5>
                            <label>Interest: Dancing,concerts,hockey</label>
                            <label> Recent visit: Astroworld concert</label>
                        </div>
                    </div>

                </div>

                <div className="socialCards">
                    <div className="pborder">
                        <Avatar className="imgDp" sx={{ width: 100, height: 100 }} src={Travis} />
                    </div>
                    <div className="contents">
                        <div className="textDoc">
                            <h5>Travis Gardner</h5>
                            <label>Interest: Basketball,Art gallery,Movies</label>
                            <label> Recent visit:AMC colonial</label>
                        </div>
                    </div>

                </div>

                <div className="socialCards">
                    <div className="pborder">
                        <Avatar className="imgDp" sx={{ width: 100, height: 100 }} src={Mary} />
                    </div>
                    <div className="contents">
                        <div className="textDoc">
                            <h5>Mary Hange</h5>
                            <label>Interest: Theatre,Fun fair, Malls</label>
                            <label> Recent visit: Lenox Square </label>
                        </div>
                    </div>

                </div>

                <div className="socialCards">
                    <div className="pborder">
                        <Avatar className="imgDp" sx={{ width: 100, height: 100 }} src={Bear} />
                    </div>
                    <div className="contents">
                        <div className="textDoc">
                            <h5>Sarah Rain</h5>
                            <label>Interest: Concerts,Marathons,Arcade</label>
                            <label> Recent visit: Renaissance World Tour Concert</label>
                        </div>
                    </div>

                </div>



            </div>
        </>


    )


}

export default Social;