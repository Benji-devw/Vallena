import React, { Component } from 'react'
import apiCall from '../../apiCall/Products_Api'
import { Container, Form, Col} from 'react-bootstrap'

import styled from 'styled-components'

const Title = styled.h1.attrs({ className: 'h1', })``
const Wrapper = styled.div.attrs({ className: 'form-group', })`
    margin: 0 30px;
`
const InputText = styled.input.attrs({ className: 'form-control', })`
    margin: 5px;
`
const Button = styled.button.attrs({ className: `btn btn-primary`, })`
    margin: 15px 15px 15px 5px;
`
const CancelButton = styled.a.attrs({ className: `btn btn-danger`, })`
    margin: 15px 15px 15px 5px;
`


export class ProductUpdate extends Component {        // lien => Dashboard.js
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            imgCollection: [],      imgCollectionCopy: [],
            titleProduct: '',       descriptionProduct: '',
            priceProduct: '',       categoryProduct: '',
            sizeProduct: '',        weightProduct: '',
            quantityProduct: '',    reporterProduct: '',

            visible: true, 
            stockProduct: true,
            promotionProduct: true, 

            notes: [], comments: [], 
        }
        this.handleChangeImgCollection = this.handleChangeImgCollection.bind(this)
    }
    handleChangeInputTitleProduct = async event => {
        this.setState({ titleProduct: event.target.value })
    }
    handleChangeInputDescriptionProduct = async event => {
        const descriptionProduct = event.target.validity.valid
            ? event.target.value
            : this.state.descriptionProduct

        this.setState({ descriptionProduct })
    }
    handleChangeInputPriceProduct = async event => {
        this.setState({ priceProduct: event.target.value })
    }
    handleChangeInputCategoryProduct = async event => {
        this.setState({ categoryProduct: event.target.value })
    }
    handleChangeInputSizeProduct = async event => {
        this.setState({ sizeProduct: event.target.value })
    }
    handleChangeInputWeightProduct = async event => {
        this.setState({ weightProduct: event.target.value })
    }
    handleChangeInputQuantityProduct = async event => {
        this.setState({ quantityProduct: event.target.value })
    }
    handleChangeInputStockProduct = async event => {
        this.setState({ stockProduct: event.target.checked })
    }
    handleChangeInputPromotionProduct = async event => {
        this.setState({ promotionProduct: event.target.checked })
    }
    handleChangeInputReporterProduct = async event => {
        this.setState({ reporterProduct: event.target.value })
    }
    handleChangeCheckboxVisible = (e) => {
        this.setState({ visible: e.target.checked })
    }
    handleChangeImgCollection = event => {
        // console.log('event.target.files', event.target.files)
        var preview = document.querySelector('#preview')
        var files = document.querySelector('input[type=file]').files;
        var displayimgC = document.querySelector('.displayImgCollection')
        
        preview.innerHTML = '<div id="preview"></div>'
        displayimgC.style.visibility = 'hidden'
        displayimgC.style.height = "0px"
        const readAndPreview = (file) => {
            // Veillez à ce que `file.name` corresponde à nos critères d’extension
            if (/\.(jpe?g|png|jpg|gif)$/i.test(file.name)) {
                var reader = new FileReader();
                reader.addEventListener("load", function () {
                    var image = new Image();
                    image.height = 200;
                    image.title = file.name;
                    image.className = "imgPreview m-3"
                    image.src = this.result;
                    preview.appendChild(image);
                }, false);
                reader.readAsDataURL(file);
            }
        }
        if (files) {
            [].forEach.call(files, readAndPreview);
        }
        this.setState({ imgCollection: event.target.files })
    }

   

    handleUpdateProduct = (e) => {
        e.preventDefault()

        var formData = new FormData();
        const id = this.state.id
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct, visible } = this.state
        
            
        const newCollection = this.state.imgCollection
        console.log('newCollection', newCollection)
        const copyCollection = this.state.imgCollectionCopy
        // console.log('copyCollection', copyCollection)

    
        console.log('diff')
        for (const key of Object.keys(newCollection)) {              // Crée un nouvel objet FormData et construit une paires clé/valeur représentant les champs du formulaire et leurs valeurs,
            formData.append('imgCollection', newCollection[key])     // Ajoute une nouvelle valeur à une clé existante dans un objet FormData, ou ajoute la clé si elle n'existe pas encore.
        }
        for (const key of Object.keys(copyCollection)) {              // Crée un nouvel objet FormData et construit une paires clé/valeur représentant les champs du formulaire et leurs valeurs,
            formData.append('copyCollection', copyCollection[key])     // Ajoute une nouvelle valeur à une clé existante dans un objet FormData, ou ajoute la clé si elle n'existe pas encore.
        }

        // formData.append('copyCollection', copyCollection)
        formData.append('titleProduct', titleProduct)
        formData.append('descriptionProduct', descriptionProduct)
        formData.append('priceProduct', priceProduct)
        formData.append('categoryProduct', categoryProduct)
        formData.append('sizeProduct', sizeProduct)
        formData.append('weightProduct', weightProduct)
        formData.append('quantityProduct', quantityProduct)
        formData.append('stockProduct', stockProduct)
        formData.append('promotionProduct', promotionProduct)
        formData.append('reporterProduct', reporterProduct)
        formData.append('visible', visible)


                                                       // ROUTE => serverURL/server.js/router.js/:id
        apiCall.updateProductById(id, formData)         // Lien => src/apiCall/index.js
        .then(res => {    
                console.log('2 UPDATE res.data......', res)
                window.alert(`Modification OK !`)
            }).catch(() => {  } ) 

        // window.location = "/dashboard";

    }


    componentDidMount = async () => {
        const { id } = this.state
        const product = await apiCall.getProductById(id)        // Lien => src/apiCall/index.js
        // console.log('product', product)
        // 2 - Rempli les input avec les valeurs
        this.setState({
            imgCollection: product.data.data.imgCollection,
            imgCollectionCopy: product.data.data.imgCollection,

            titleProduct: product.data.data.titleProduct,
            descriptionProduct: product.data.data.descriptionProduct,
            priceProduct: product.data.data.priceProduct,
            categoryProduct: product.data.data.categoryProduct,
            sizeProduct: product.data.data.sizeProduct,
            weightProduct: product.data.data.weightProduct,
            quantityProduct: product.data.data.quantityProduct,
            stockProduct: product.data.data.stockProduct,
            promotionProduct: product.data.data.promotionProduct,
            reporterProduct: product.data.data.reporterProduct,
            visible: product.data.data.visible,
        })
        
    }



    render() {
       const {imgCollection} = this.state
    //    console.log('imgCollection', imgCollection)
    //    console.log('imgCollectioncopy', imgCollectionCopy)

       const imgDisplay = []

        for (let i = 0; i < imgCollection.length; i++) {
            imgDisplay.push(<img src={imgCollection[i]} key={[i]} alt="img" className="img-responsive m-3" style={{ height: '200px' }} />);
        }

        return (
            <Wrapper>
                <Container>
                <Form>  

                <Title className="mt-5">Update product</Title>

                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Control
                            placeholder="Nom du produit"
                            type="text"
                            defaultValue={this.state.titleProduct}
                            onChange={this.handleChangeInputTitleProduct}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">

                        <Form.Control
                            label="Catégorie"
                            as="select"
                            onChange={this.handleChangeInputCategoryProduct}
                            required
                        >
                            <option>{this.state.categoryProduct}</option>
                            <option>Masques</option>
                            <option>Pochettes</option>
                            <option>Trousse</option>
                            <option>Dingettes</option>
                            <option>Panière</option>
                            <option>Attache tétine</option>
                            <option>Sac à dos</option>
                            <option>Couverture</option>
                            <option>Bavoir</option>
                            <option>Doudou</option>
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="8" controlId="validationCustom03">
                        <Form.Control as="textarea" rows="5"
                            placeholder="Description de produit..."
                            defaultValue={this.state.descriptionProduct}
                            onChange={this.handleChangeInputDescriptionProduct}
                            required
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Prix</Form.Label>
                        <InputText
                            placeholder="Prix..."
                            type="number"
                            defaultValue={this.state.priceProduct}
                            onChange={this.handleChangeInputPriceProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Dimension</Form.Label>
                        <InputText
                            placeholder='Taille... "xs/xxl..." "3 x 7 mm..."'
                            type="text"
                            defaultValue={this.state.sizeProduct}
                            onChange={this.handleChangeInputSizeProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <Form.Label>Poids</Form.Label>
                        <InputText
                            placeholder='Poids... "2" "0.3"'
                            type="text"
                            defaultValue={this.state.weightProduct}
                            onChange={this.handleChangeInputWeightProduct}
                            required
                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom07">
                        <Form.Label>Quantités</Form.Label>
                        <InputText
                            placeholder="Quantité..."
                            type="number"
                            defaultValue={this.state.quantityProduct}
                            onChange={this.handleChangeInputQuantityProduct}
                            required
                        />  
                    </Form.Group>
                </Form.Row>
    

                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="3" controlId="exampleForm.ControlSelect8">
                        <Form.Label>Crée par :</Form.Label>
                        <InputText
                            placeholder="Crée par ..."
                            type="text"
                            defaultValue={this.state.reporterProduct}
                            onChange={this.handleChangeInputReporterProduct}
                            required
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect9">
                        <Form.Check type="checkbox"
                            label="Visible"
                            checked={this.state.visible}
                            onChange={this.handleChangeCheckboxVisible}
                        />
                    </Form.Group>  
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect10">
                        <Form.Check type="checkbox"
                            label="En stock"
                            checked={this.state.stockProduct}
                            onChange={this.handleChangeInputStockProduct}
                        />
                    </Form.Group> 
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect11">
                        <Form.Check type="checkbox"
                            label="En Promotion"
                            checked={this.state.promotionProduct}
                            onChange={this.handleChangeInputPromotionProduct}
                        />
                    </Form.Group>
                    
                </Form.Row>

                    <Form.Row className="justify-content-md-center">
                        <Form.Group>
                            <Form.File defaultValue={imgCollection}
                                className="position-relative"
                                id="custom-file"
                                label="Inserer des images"
                                type="file"
                                name="imgCollection"
                                onChange={this.handleChangeImgCollection}
                                accept="image/*"
                                multiple
                                feedbackTooltip
                                custom
                                required
                            />
                        </Form.Group>
                        </Form.Row> 
                        <Form.Row className="justify-content-md-center p-3">
                            <div id="preview"></div>
                            <div className="displayImgCollection">
                                {imgDisplay}
                            </div>

                        </Form.Row>
                        
                <Button onClick={this.handleUpdateProduct}>Update product</Button>
                <CancelButton href={'/Dashboard'}>Cancel</CancelButton>

            </Form>
            </Container>
            </Wrapper>
        )
    }
}

