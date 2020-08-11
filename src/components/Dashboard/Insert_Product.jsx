import React, { Component } from 'react'
import apiCall from '../../apiCall/Products_Api'
import {Form, Col} from 'react-bootstrap'


import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})` margin: 0 30px; `
const InputText = styled.input.attrs({ className: 'form-control', })`
    margin: 5px;
`
const Button = styled.button.attrs({ className: `btn btn-primary`, })`
    margin: 15px 15px 15px 5px;
`

export class InsertProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleProduct: '',        descriptionProduct: '',
            priceProduct: '',        categoryProduct: '',
            sizeProduct: '',         weightProduct: '',
            quantityProduct: '',     reporterProduct: '',
            promotionProduct: false, stockProduct: true,
            visible: true,           notes: 0,
            comments: [],           imgCollection: ''
        }
    }
    
    handleChangeInputTitleProduct = async event => {
        this.setState({ titleProduct: event.target.value})
    }
    handleChangeInputDescriptionProduct = async event => {
        const descriptionProduct = event.target.validity.valid
            ? event.target.value
            : this.state.descriptionProduct

        this.setState({ descriptionProduct })
    }
    handleChangeInputPriceProduct = async event => {
        this.setState({ priceProduct: event.target.value})
    }
    handleChangeInputCategoryProduct = async event => { 
        this.setState({ categoryProduct: event.target.value})
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
        this.setState({ imgCollection: event.target.files })
    }


    handleIncludeNewProduct = async (e) => {
        e.preventDefault()
        
        const { imgCollection, titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct, visible, notes, comments } = this.state
        
        if (!!titleProduct && !!descriptionProduct && !!priceProduct && categoryProduct && sizeProduct && weightProduct && quantityProduct && reporterProduct)
        {  

            var formData = new FormData();
            for (const key of Object.keys(this.state.imgCollection)) {              // Crée un nouvel objet FormData et construit une paires clé/valeur représentant les champs du formulaire et leurs valeurs,
                formData.append('imgCollection', this.state.imgCollection[key])     // Ajoute une nouvelle valeur à une clé existante dans un objet FormData, ou ajoute la clé si elle n'existe pas encore.
            }

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
            formData.append('notes', notes)
            formData.append('comments', comments)
            

            apiCall.insertProduct(formData).then(res => {
                console.log('2 res.data......', res.data)
            })
        }
        
    }


    render() {
        const { imgCollection } = this.state

        return (
            <Wrapper>
                <Form>

                <Title>Create Product</Title>

                <Form.Row className="justify-content-md-center">
                    <Form.Group>
                        <Form.File
                            className="position-relative"
                            id="custom-file"
                            label="Inserer des images"
                            type="file"
                            name="imgCollection"
                            onChange={this.handleChangeImgCollection} 
                            multiple
                            feedbackTooltip
                            custom
                            required
                        />
                    </Form.Group>
                </Form.Row> 


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
                            <option></option>
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
                        <InputText
                            placeholder="Prix..."
                            type="number"
                            defaultValue={this.state.priceProduct}
                            onChange={this.handleChangeInputPriceProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <InputText
                            placeholder='Taille... "xs/xxl..." "3 x 7 mm..."'
                            type="text"
                            defaultValue={this.state.sizeProduct}
                            onChange={this.handleChangeInputSizeProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <InputText
                            placeholder='Poids... "2" "0.3"'
                            type="text"
                            defaultValue={this.state.weightProduct}
                            onChange={this.handleChangeInputWeightProduct}
                            required
                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom07">
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
                            defaultChecked={this.state.visible}
                            onChange={this.handleChangeCheckboxVisible}
                        />
                    </Form.Group>  
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect10">
                        <Form.Check type="checkbox"
                            label="En stock"
                            defaultChecked={this.state.stockProduct}
                            onChange={this.handleChangeInputStockProduct}
                        />
                    </Form.Group> 
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect11">
                        <Form.Check type="checkbox"
                            label="En Promotion"
                            defaultChecked={this.state.promotionProduct}
                            onChange={this.handleChangeInputPromotionProduct}
                        />
                    </Form.Group>
                    
                </Form.Row>
                

                <Button onClick={this.handleIncludeNewProduct}>Envoyer</Button>

                </Form>
            </Wrapper>
        )
    }
}

