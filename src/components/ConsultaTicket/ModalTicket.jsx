import { useContext, useRef, useState } from 'react'
import Ticket from '../Ticket'
import './modalTicket.css'

export default function ModalTicket(post={post}) {

    return (
        <div className="login">
            <Ticket post={post} />                   
        </div>            
    )
}
