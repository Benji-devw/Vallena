import React, { useState, useEffect } from 'react';
import apiCallOrders from '../../../../../apiCall/Call_Api'
import apiCallComments from '../../../../../apiCall/Call_Api'

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Form, Col } from 'react-bootstrap'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import moment from 'moment'
import { green, red } from '@material-ui/core/colors';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		textAlign: 'center',
		width: '50%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		boxShadow: '0 0 3px 3px #e0e0e0',
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '17ch',
			'&:focus': {
				width: '25ch',
			},
		},
	},
}));




const CustomerComments = props => {
	const product = props.data
	const classes = useStyles();
	const [comments, setComments] = useState([]);
	const [show, setShow] = useState(false);
	const [sumNote, setSumNote] = useState([])

	/***** Open PopInfoComment *****/
	/***************************/
	const [openInfo, setOpenInfo] = React.useState(false);
	const handleTooltipClose = () => {setOpenInfo(false);};
	const handleTooltipOpen = () => {setOpenInfo(true);};

	/***** Form Comment + Client Message *****/
	/***************************/
	const [checkForm, setCheckForm] = useState()
	const [searchOrder, setSearchOrder] = useState();
	const [foundOk, setFoundOk] = useState()
	const [successSendComment, setSuccessSendComment] = useState(false)
	const [disabledBtn, setDisabledBtn] = useState(true)

	const [orderNumber, setOrderNumber] = useState([])
	const [ratingValue, setRatingValue] = useState(2);
	const [dateBuy, setDateBuy] = useState([])
	const [commentsBy, setComentsBy] = useState([])
	const [commentClientTitle, setComentClientTitle] = useState([])
	const [commentClient, setComentClient] = useState([])

	const textArea = (text) => {
		let test = text.replace(/(?:\r\n|\r|\n)/g, '<br />')
		setComentClient(test)
	}

	useEffect(() => {
		/***** Get Comments *****/
		/************************/
		apiCallComments.getComments().then(comments => {
			const comment = comments.data.data
			let commentItem = []
			let calc = []
			comment.forEach(element => {
				if (element.status) {
					if (element.idProduct === product._id) {
						commentItem.push(element)
						calc.push(parseInt(element.note))
					}
				}
			});
			setComments(commentItem)
			if (calc.length > 0) {
				let sum = calc.reduce((a, b) => {
					return (a + b)
				}, 0)
				setSumNote(sum / calc.length)
			}
		})
		if (foundOk && ratingValue > 0 && commentsBy.length > 0 && commentClientTitle.length > 0 && commentClient.length > 0) {
			setDisabledBtn(false)
		} else { setDisabledBtn(true)}
	}, [product._id, foundOk, ratingValue, commentsBy.length, commentClientTitle.length, commentClient.length])



	/***** Post Comment *****/
	/***************************/
	const sendComment = () => {
		const infosClientComment = { 
			orderNumber: orderNumber,
			idProduct: product._id,
			by: commentsBy,
			messageTitle: commentClientTitle,
			message: commentClient,
			note: ratingValue,
			dateBuy: dateBuy,
			datePost: moment().format('Do MMMM YYYY'), 
			status: false,
		}
		if (foundOk && ratingValue > 0 && commentsBy.length > 0 && commentClientTitle.length > 0 && commentClient.length > 0) {
			apiCallComments.insertComment(infosClientComment).then(res => {
				setSuccessSendComment(true)
			})
		}

	}



	/***** Find Order *****/
	/***************************/
	// const test = [{ orderNumber: "6769018338869VL"}]
	const findOrder = () => {
		if (searchOrder === undefined || searchOrder[0].orderNumber.length !== 15) {
			setCheckForm(false)
			setOrderNumber(searchOrder)
			return false
		}
		setCheckForm(true)
		apiCallOrders.getOrderByOrderNumber(searchOrder).then(order => {
			// console.log('order', order)
			let tabs = []
			const orderFound = order.data.order.items
			orderFound.map(item => (
				tabs.push(item.details._id)
			))
			if (tabs.indexOf(product._id) > -1) {
				setFoundOk(true)
			} else (setFoundOk(false))

			setDateBuy(order.data.order.date)
		})
	}





	/***** Modal Post Comment *****/
	/***************************/
	const createComment = () => {
		/***** Send Comment Control *****/

		const CommentControl = () => {
			return (
				<Button className="mx-auto m-3" variant="contained" color="primary" style={{ borderRadius: "20px" }}
					disabled={disabledBtn ? true : false}
					onClick={() => sendComment()}
				>Soumettre le commentaire
				</Button>
			)
		}
		return (
			<>
			{ !successSendComment ? (
				<>
				<Button variant="contained" color="primary" style={{ borderRadius: "20px" }}
					onClick={() => setShow(true)}
				>DONNEZ VOTRE AVIS
				</Button>
				<Modal
					show={show}
					onHide={() => setShow(false)}
					className=""
					centered
				>
					<Modal.Body className="row">
						<div className="col-12 p-2 text-center">
							<h3>RÉDACTION DE VOTRE AVIS :</h3>
						</div>
						
						<div className={`col-12 m-2 ${classes.search}`}>
							<Form.Group as={Col} md="4" controlId="validationCustom00" className="mx-auto">
								<p style={{position: 'absolute', left:"-1em", top:".5em"}}>{checkForm === true && <CheckCircleOutlineIcon style={{ color: green[500] }} />}</p>
								<p style={{ position: 'absolute', left: "-1em", top: ".5em" }}>{checkForm === false && <ErrorOutlineIcon style={{ color: red[500] }} />}</p>
								<p style={{position: 'absolute', left:"-1em", top:".5em"}}>{searchOrder === undefined && ''}</p>
								<Form.Control
									placeholder="N° commande..."
									onChange={(e) => {
										setSearchOrder([{ orderNumber: e.target.value }]);
										setOrderNumber( e.target.value );
									}}
									required
								/>
							</Form.Group>

							{checkForm === false ? <p className="fadeIn text-danger">"Numéro de commande invalide !"</p> : ''}
							{foundOk === false ? <p className="fadeIn text-danger">"L'article que vous souhaitez noter ne fait pas parti de cette commande !"</p> : ''}

							<Button className="m-2" variant="contained" color="primary" style={{ borderRadius: "20px", fontSize:".8em", outline:'none' }}
								onClick={() => findOrder()}
							>Recherche
							</Button>
						</div>

						<div className="col-12 mt-3">
							<div className="row">
								<div className="col-md-4">
									<div className="row">
										<div className="col-12">
											<Box component="fieldset" mb={3} borderColor="transparent">
												<Typography component="legend">Votre note :</Typography>
												<Rating
													name="simple-controlled"
													precision={1}
													value={ratingValue}
													onChange={(event, newValue) => {
														setRatingValue(newValue);
													}}
												/>
											</Box>
										</div>
										<div className="col-12">
											<ClickAwayListener onClickAway={handleTooltipClose}>
												<div className="pop-info">
													<Tooltip
														PopperProps={{
															disablePortal: true,
														}}
														
														onClose={handleTooltipClose}
														open={openInfo}
														disableFocusListener
														disableHoverListener
														disableTouchListener
														title={
															<p className="pop-info-comment">
																Nous vous remercions de prendre du temps pour vous exprimer sur les produits que vous avez récemment achetés. <br />
																Nous attirons toutefois votre attention sur le fait que ce commentaire doit respecter une charte pour être mis en ligne*. <br />
																Vallena.fr donne la possibilité au consommateur de décrire son expérience de consommation avec ses mots et son langage.<br /><br />
																Toutefois, pour la validation, il est demandé de :<br />
																• Ne pas copier les avis d’autres personnes<br />
																• Déposer un avis lisible, clair et compréhensible par tout le monde<br />
																• Eviter le langage SMS, les fautes d’orthographe, le langage grossier ou vulgaire, les abréviations.<br />
																• Rédiger un avis concernant uniquement le produit (et non par exemple la livraison)<br />
															</p>
														}
													>
													<Button style={{ outline: "none"}} onClick={handleTooltipOpen}><b>RÈGLES DE BONNE CONDUITE DES AVIS <InfoIcon /></b></Button>
													</Tooltip>
												</div>
											</ClickAwayListener>
										</div>
									</div>
									
								</div>
								<div className="col-md-8">
									<Box component="fieldset" mb={3} borderColor="transparent">
										<Typography component="legend">Votre avis :</Typography>

										<Form.Row className="text-left">
											<p className="m-2">De : *</p>
											<Form.Group as={Col} md="12" controlId="validationCustom01" className="d-flex align-items-end">
												<Form.Control
													// placeholder="Nom du produit"
													type="text"
													onChange={(e) => setComentsBy( e.target.value )}
													required
												/>
												{/* <span className="text-danger">{this.state.alert === "titleError" && "champ incorrect"}</span> */}
											</Form.Group>

											<p className="m-2">Titre de votre commentaire : *</p>
											<Form.Group as={Col} md="12" controlId="validationCustom02" className="d-flex align-items-end">
											<Form.Control
													// placeholder="Nom du produit"
													type="text"
													onChange={(e) => setComentClientTitle( e.target.value )}
													required
												/>
												{/* <span className="text-danger">{this.state.alert === "titleError" && "champ incorrect"}</span> */}
											</Form.Group>
										
											<p className="m-2">Commentaire détaillé : *</p>
											<Form.Group as={Col} md="12" controlId="validationCustom03">
											<Form.Control as="textarea" rows="5"
												placeholder="Pourquoi avez-vous donné cette note ? 
																Détaillez ce que vous avez apprécié ou ce qui ne vous a pas plu sur ce produit..."
												onChange={(e) => textArea( e.target.value )}
												// onChange={(e) => setComentClient( e.target.value )}
												required
											/>
											{/* <span className="text-danger">{this.state.alert === "descError" && "champ incorrect"}</span> */}
										</Form.Group>
										</Form.Row>
									</Box>
								</div>
							</div>

						</div>
						</Modal.Body>
					{CommentControl()}
					</Modal>
				</>
			) : (
				<Modal
					show={show}
					onHide={() => setShow(false)}
					className=""
					centered
				>
					<Modal.Body className="row">
						<div className="col p-5 text-center">
							<h2>MERCI pour votre commentaire</h2>
							<p>Votre commentaire sera mise en ligne une fois validé !</p>
						</div>
					
					</Modal.Body>
					
				</Modal>
			)}
			</>
		)
	}


	

	const avisClient = (event) => {
		return (
			<>
				<Rating className='mx-auto' name="half-rating-read" value={event} precision={1} readOnly size="small" />
			</>
		)
	}

	return (
		<div className="row p-2 justify-content-center avis-client">

			<div className="col-12 comments-title" style={{maxHeight:"100px"}}>
				<h4>Avis sur {product.titleProduct}</h4>
			</div>

				{comments.length >= 1 ? (
					<>
			<div className="col-sm-8 m-3 comments-clients">
					<div className="col-12 p-3 comments-general" style={{marginTop:"-2rem"}}>
						<h5>NOTE GÉNÉRALE :</h5>
						<p><b style={{fontSize:"1.5em"}}>{Math.floor(sumNote)}</b> <b> / 5</b></p>
						{avisClient(parseInt(sumNote))} sur <b>{comments.length} avis</b>
					</div>
					<div className="col-md-4 mb-5 mx-auto comments-add">
						{createComment()}
					</div>
					{comments.map((message, id) => 
						<div key={id}>
							{message.status && 
								<>
								<div className="row p-2" style={{borderTop: "2px solid #e0e0e0"}}>
								<div className="col-sm-4 text-left">
									<p>
									<b>par : {message.by}</b> <br />
									publié le {message.datePost} <br />
									Produit acheté le {message.dateBuy.slice(0, 10)} <br />
									</p>
								</div>
								<div className="col-sm-8 text-left ratingClient">
									<div className="mt-1 mb-3">
										{avisClient(parseInt(message.note))} 
										<b style={{position: "absolute",paddingLeft:"5px"}}> - {message.messageTitle}</b>
									</div>
										{
											message.message.split("<br />").map(function (item, idx) {
												return ( <p key={idx}> {item} <br /> </p> )
											})
										}
								</div>
							</div>
							</>
							}
						</div>
					)}
					</div>
					</>
				) : (
					<>
						<div className="col-sm-8 m-3">
							<div className="row">
								<div className="col-sm-12">
								<p>Aucun commentaire</p>
							</div>
							<div className="col-sm-12">
								{createComment()}
							</div>
							</div>
						</div>
					</>
				)}
				
			

		</div>
	);
	
}
export default CustomerComments

