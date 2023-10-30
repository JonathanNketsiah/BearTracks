import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './LoginFront.css'
import Avatar from '@mui/material/Avatar';
import defaultAvatar from './Assets/defaultAvatar.png'



const Profile = () => {
    const imageRef = useRef(null);
    const [image, setImage] = useState("")

    const handleClick = () => {
        imageRef.current.click();
    }

    const handlebase64 = (e) => {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result)
        }

        reader.onerror = error => {
            console.log("Error: ", error);
        }

    }

        return (
            <>
                <div className="primaryCont">
                    <h2 className="profileTitle">My Account</h2>
                    <div className="profilePic">

                        {image ? <Avatar sx={{ width: 96, height: 96 }} src={image} /> : <Avatar sx={{ width: 96, height: 96 }} src={defaultAvatar} />}
                       


                    </div>
                    <div onClick={handleClick } className ="profilePic">
                        <input type="file" ref={imageRef} accept="image/*" onChange={handlebase64} style={{ display: "none" }} />
                    <button className="editPicbtn">edit profile</button>
                    </div>

                    <div className="profileContainer">
                        <div className="cards">
                            <p>Name: Jonathan</p>

                        </div>

                        <div className="cards">
                            <p>Email: Joa@gmail.com</p>

                        </div>

                        <div className="cards">
                            <p>UserName: jnket</p>

                        </div>
                    </div>
                </div>
            </>
        )


    }


export default Profile;