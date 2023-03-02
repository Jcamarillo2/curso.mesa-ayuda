import './profile.css'

import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import {useEffect, useState} from 'react'
import {useParams} from "react-router"
import axios from 'axios'

export default function Profile() {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] =useState([])
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () =>{
            // const res = await axios.get(`/users/${post.userId}`)
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    },[username])

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {/* <img className="profileCoverImg" src={ PF + "post/3.jpeg"} alt="" /> */}
                            <img className="profileCoverImg" src={ PF + (user.coverPicture ? user.coverPicture : "person/nocover.png")} alt="" />
                            {/* <img className="profileUserImg" src={PF + "person/7.jpeg"} alt="" /> */}
                            <img className="profileUserImg" src={ PF + (user.ProfilePicture ? user.ProfilePicture : "person/noAvatar.png")} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">                        
                        <Feed username={username}/>
                        {/* <Rightbar profile/> */}
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
