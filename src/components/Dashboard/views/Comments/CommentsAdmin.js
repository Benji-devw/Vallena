import React, {useEffect, useState}  from 'react';
import Rating from '@material-ui/lab/Rating';
import apiCallComments from '../../../../apiCall/Call_Api'
import apiCallProdcuts from '../../../../apiCall/Call_Api'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import PuffLoader from "react-spinners/PuffLoader";
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  searchIcon: {
    marginTop: "-5px",
    marginLeft: "5px",
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: "10"
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    background: "#ffffff",
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: '3px',
    [theme.breakpoints.up('sm')]: {
      width: '22ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));




export default function CommentsAdmin() {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [commentWait, setCommentWait] = useState();
  const [display, setDisplay] = useState(false)

  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [preview, setPreview] = useState([])




  /***** Send Filters *****/
  /***************************/
  const showFilteredResult = (filters) => {
    let payload = { filters: filters }

    apiCallComments.commentsFilter(payload).then(comments => {
        setComments([...comments.data.data])
        setIsLoading(false)
      })
  }





  /***** Sort Filters *****/
  /***************************/
  const handleSort = (event) => {
    switch (event) {
      case "true":
        setStatus(true)
        break;
      case "false":
        setStatus(false)
        break;
      default:
        setStatus(false)
        break;
    }
  }

  /***** SearchBar Filters *****/
  /***************************/
  const searchBar = (input) => {
    const fullListMap = allComments.map(comm => comm)
    let fullList = fullListMap.flat()
    // const fullList = comments
    const term = input.toLowerCase()
      setComments( fullList.filter(comment =>
          comment.orderNumber.toLowerCase().indexOf(term) > -1 ||
          comment.idProduct.toLowerCase().indexOf(term) > -1
      ))
  }
  
  

  /***** Change Status *****/
  /***************************/
  const Valider = (id) => {
    setCommentWait(commentWait => ({
      ...commentWait, status: true
        }))
      // if (id === commentWait._id) {
        setDisplay(true)
      // }
  }
  const stopDisplay = (id) => {
    setCommentWait(commentWait => ({
      ...commentWait, status: false
    }))
    // if (id === commentWait._id) {
    setDisplay(true)
    // }
  }

  const update = (id) => {
    if (id === commentWait._id) {
      apiCallComments.updateComment(id, commentWait)
      // console.log('commentsWait', commentWait)
      document.location.reload();
    } else { document.location.reload();}
  }   
  const updateForStopDisplay = (id) => {
    if (id === commentWait._id) {
      apiCallComments.updateComment(id, commentWait)
      // console.log('commentsWait', commentWait)
      document.location.reload();
    } else { document.location.reload();}
  } 

  const deleteComment = (id) => {
    console.log(id);
    if (window.confirm(`Supprimer définitivement le commentaire : ${id}`)) {
      // apiCallComments.deleteComment(id)
      // window.location.reload()
      alert('Suppression désactivé !')
    }
  }

  const avisClient = (event) => {
    return (
      <>
        <Rating className='mx-auto' name="half-rating-read" value={event} precision={1} readOnly size="small" />
      </>
    )
  }



  useEffect(() => {
    const newVal = {}
    newVal.status = status
    showFilteredResult(newVal)

    if (isLoading) {
      if (allComments.length <= 0) {
        apiCallProdcuts.getProducts().then(prodcuts => {
          setPreview(prodcuts.data.products)
        })
        apiCallComments.getComments().then(comments => {
          setAllComments(comments.data.data)
          setIsLoading(false)
        })
      }
    }

  }, [status, isLoading, allComments.length])





  return (
    <React.Fragment>
      <div className={`comments-admin mt-5`}>
      <h3 className="mb-4">Commentaires: <span>resultat({comments.length})</span></h3>


        <div className="row">
          <div className="col-sm-6 text-left">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="N°commande ... ID" aria-label="search"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => searchBar(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6 filter-sort-date text-right p-2">
            Tri par
            <select style={{ width: "10rem", height: "2rem", marginLeft: "1rem" }}
              className="custom-select"
              onChange={(e) => handleSort(e.target.value)}>
              <option value="false">A confirmer</option>
              <option value="true">Valider</option>
            </select>
          </div>
        </div>


        {!isLoading ? (
          <>
          {comments.length > 0 ? (
            <>
              {comments.map((message, id) =>
                  <div key={id} className="row p-3" style={{ borderTop: "1px solid #3f51b5", margin: "1rem" }}>
                    <div className="col-md-4">
                      <div className="row text-center m-3">
                        <b>Commande N° {message.orderNumber}</b> <br />
                        <b>ID : {message.idProduct}</b>
                        { preview.map((product, id) =>
                            <div key={id}>
                              {message.idProduct === product._id &&
                                (
                                  <img src={product.imgCollection[0]} alt={id} style={{ height: "170px" }} />
                                )
                              }
                            </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-12 text-left">
                          <p>
                            <b>par : {message.by}</b> <br />
                            publié le {message.datePost} <br />
                            Produit acheté le {message.dateBuy.slice(0, 10)} <br />
                          </p>
                        </div>
                        <div className="col-12 text-left ratingClient">

                          <div className="mt-1 mb-1">
                            {avisClient(parseInt(message.note))}
                            <b style={{ position: "absolute", paddingLeft: "5px" }}> - {message.messageTitle}</b>
                          </div>
                          {
                            message.message.split("<br />").map(function (item, idx) {
                              return ( <p key={idx}> {item} <br /> </p> )
                            })
                          }
                        </div>

                      </div>


                    </div>
                    <div className="col-8 mx-auto text-center" style={{ border: "1px solid #e0e0e0", margin: "1rem" }}>
                      <h5>Status : {message.status ? <b className="text-success">Validé</b> : <b className="text-danger">A confirmer ...</b>}</h5>
                      {!message.status ? (
                        <>
                          {display &&
                            <Button className="mx-auto m-3" variant="contained" color="primary" style={{ borderRadius: "20px" }}
                              onClick={() => update(message._id)
                              }>Confirmer
                        </Button>
                          }
                          {!display &&
                            <Button className="mx-auto m-3" variant="contained" color="primary" style={{ borderRadius: "20px" }}
                              onClick={() => {
                                setCommentWait(message)
                                Valider(message._id)
                              }}>Valider
                        </Button>
                          }
                        </>
                      ) : (
                          <>
                            {display &&
                              <Button className="mx-auto m-3" variant="contained" color="primary" style={{ borderRadius: "20px" }}
                                onClick={() => updateForStopDisplay(message._id)
                                }>Confirmer
                        </Button>
                            }
                            {!display &&
                              <Button className="mx-auto m-3" variant="contained" color="primary" style={{ borderRadius: "20px" }}
                                onClick={() => {
                                  setCommentWait(message)
                                  stopDisplay(message._id)
                                }}>Ne plus afficher
                        </Button>
                            }
                          </>
                        )}
                      <Button className="mx-auto ml-2 text-danger" onClick={() => { deleteComment(message._id) }}>Supprimer </Button>
                    </div>
                  </div>
                )
              }
            </>
          ) : ( <p>Aucun résultat</p>)}
          </>
        ): (<PuffLoader size = { 50 } color = { "#f50057" }/>)}
        
      </div>
    </React.Fragment>
  );
}









