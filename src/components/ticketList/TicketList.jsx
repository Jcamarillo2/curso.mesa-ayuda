import {  makeStyles,  Modal, Container} from "@material-ui/core"
import "./ticketList.css"

import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import config from "../../config"
import ModalTicket from "../ConsultaTicket/ModalTicket";
import Ticket from "../Ticket";

const useStyles = makeStyles((theme) => ({ 
  container: {
    width: '50%',
    height: '95%',
    display:'flex',
    flexDirection:'column',
    backgroundColor: "white",
    position: "absolute",
    borderRadius:"30px",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    overflowY: 'scroll',
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 10%)",
      height: "calc(100vh - 10%)",
    },
  },

  shareButton:{
    border: "none",
    padding:"7px",
    borderRadius: "50px",
    width:'20px',
    height:'20px',
    backgroundColor:"green",
    fontWeight: 500,
    marginBottom: "20px",
    cursor: "pointer",
    color: "white",
    position:'absolute',
    bottom:'10px',
    right:'20px',
    display:'flex',
    justifyContent:'center',
    
} , 
}));


export default function TicketList( {posts}) {
  const PF = config.proxyRoute; //config.publicFolder
  const PR = config.proxyRoute;
  const classes = useStyles();

  const [data, setData]=useState([])

  const [openModal, setOpenModal] = useState(false)
  const [post, setPost] =useState({})

  useEffect(()=>{
    setData(posts)
  },[posts])

  
  
  // const handleDelete = (folio) =>{
  //   setData(data.filter((item) => item.folio !== folio))
  // }

  const columns = [
    // { field: 'folio', headerName: '#', width: 70 },
    {
      field:'actn',
      headerName:'#',
      width:85,
      renderCell:(params)=>{
        return (
            <>
              {/* <Link to={"/tickets/" + params.row.folio}>
                <button className="userListEdit">{params.row.folio}</button>
              </Link> */}
              {/* <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.folio)}/> */}
              <button className="userListEdit"
              onClick={ ()=> {
                setOpenModal(true)
                setPost(params.row)                
              } }
              >{params.row.folio}</button>
            </>
        )
      }
    },
    {
      field: 'dateCreacion',
      headerName: 'Fecha',    
      width: 120,
      editable: true,
    },
    {
      field: 'asunto',
      headerName: 'Asunto Creación',    
      width: 300,
      editable: true,
    },    
    {
      field: 'Solicitante',
      headerName: 'Solicitante',
      width: 170,
      renderCell: (params)=>{
        return (
          <div className="userListUser">
           <img className="userListImg" src= {params.row.photoSolicita ? PF + params.row.photoSolicita: PF +'/users/noavatar.png'} alt=""/>
           {params.row.Solicitante} 
          </div>
        )
      },
    },
    {
      field: 'areaSolicitante',
      headerName: 'Área Solicitó',    
      width: 170,
      editable: true,
    },
    {
      field: 'Atiende',
      headerName: 'Atiende',
      width: 170,
      renderCell: (params)=>{
        return (
          <div className="userListUser">
           <img className="userListImg" src= {params.row.photoAtiende ? PF + params.row.photoAtiende: PF +'/users/noavatar.png'} alt=""/>           
           {params.row.Atiende} 
          </div>
        )
      },
    },
    {
      field: 'area_Atiende',
      headerName: 'Área Atiende',    
      width: 170,
      editable: true,
    },        
    {
      field: 'status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,  
    },
    {
      field: 'fechaLastComent',
      headerName: 'F Último C.',    
      width: 150,
      editable: true,
    },
    {
      field: 'fechaCierre',
      headerName: 'F Cierre',    
      width: 120,
      editable: true,
    },   


    {
      field: 'LastComent',
      headerName: 'último comentario',    
      width: 600,
      editable: true,
    },  
  ];

  return (
    
      <div className="userList">
        <DataGrid style={{height: '100%', width: '100%'}} autoHeight
          rows={data}        
          columns={columns}
          getRowId ={(row) => row.folio}
          pageSize={9}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
        />   
              <Modal open={openModal}>
        <Container className={classes.container} >
          {/* <form className={classes.form} > */}
            {/* <label>Acción siguiente: Ventana modal</label> */}
            <Ticket post={post} />

            <bottom className={classes.shareButton} onClick={()=> setOpenModal(false)}>X</bottom>
          {/* </form> */}
        </Container>
      </Modal>     
      </div>



    
    
  )
}
