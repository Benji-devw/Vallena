import React, { Component } from 'react'
import apiCall from '../../apiCall/Products_Api'
import Form from 'react-bootstrap/Form'

import styled from 'styled-components'

const Title = styled.h1.attrs({ className: 'h1', })``
const Wrapper = styled.div.attrs({ className: 'form-group', })`
    margin: 0 30px;
`
const Label = styled.label`  margin: 5px; `
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
            titleProduct: '',
            descriptionProduct: '',
            priceProduct: '',
            categoryProduct: '',

            sizeProduct: '',
            weightProduct: '',
            quantityProduct: '',
            stockProduct: '',
            promotionProduct: '',
            
            reporterProduct: ''
        }
    }
    handleChangeInputTitleProduct = async event => {
        const titleProduct = event.target.value
        this.setState({ titleProduct })
    }
    handleChangeInputDescriptionProduct = async event => {
        const descriptionProduct = event.target.validity.valid
            ? event.target.value
            : this.state.descriptionProduct

        this.setState({ descriptionProduct })
    }
    handleChangeInputPriceProduct = async event => {
        const priceProduct = event.target.value
        this.setState({ priceProduct })
    }
    handleChangeInputCategoryProduct = async event => {
        const categoryProduct = event.target.value
        this.setState({ categoryProduct })
    }    
    handleChangeInputSizeProduct = async event => {
        const sizeProduct = event.target.value
        this.setState({ sizeProduct })
    }    
    handleChangeInputWeightProduct = async event => {
        const weightProduct = event.target.value
        this.setState({ weightProduct })
    }   
    handleChangeInputQuantityProduct = async event => {
        const quantityProduct = event.target.value
        this.setState({ quantityProduct })
    }    
    handleChangeInputStockProduct = async event => {
        const stockProduct = event.target.value
        this.setState({ stockProduct })
    }   
     handleChangeInputPromotionProduct = async event => {
        const promotionProduct = event.target.value
        this.setState({ promotionProduct })
    }
    handleChangeInputReporterProduct = async event => {
        const reporterProduct = event.target.value
        this.setState({ reporterProduct })
    }
    handleUpdateProduct = async () => {
        const { id, titleProduct, descriptionProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, priceProduct, reporterProduct } = this.state
        const payload = { titleProduct, descriptionProduct, categoryProduct, priceProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct }

        // recup valeurs des state et update BDD
        await apiCall.updateProductById(id, payload).then(res => {      // Lien => src/apiCall/index.js
            window.alert(`Product updated successfully`)
            this.setState({
                titleProduct: '',
                descriptionProduct: '',
                priceProduct: '',
                categoryProduct: '',
                sizeProduct: '',
                weightProduct: '',
                quantityProduct: '',
                stockProduct: '',
                promotionProduct: '',
                reporterProduct: ''
            })
            window.location = "/dashboard";
        })
    }

    componentDidMount = async () => {
        const { id } = this.state

        // 1 - Recupère les valeur en BDD
        const product = await apiCall.getProductById(id)        // Lien => src/apiCall/index.js
        // 2 - Rempli les input avec les valeurs
        this.setState({
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
        })
    }

    render() {
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct } = this.state
        return (
            <Wrapper>
                <Title>Update product</Title>

                <Label>Title : </Label>
                <InputText
                    type="text"
                    value={titleProduct}
                    onChange={this.handleChangeInputTitleProduct}
                />

                <Label>General Information : </Label>
                <Form.Control as="textarea" rows="3" 
                    value={descriptionProduct}
                    onChange={this.handleChangeInputDescriptionProduct}
                />

                <Label>Price : </Label>
                <InputText
                    type="number"
                    value={priceProduct}
                    onChange={this.handleChangeInputPriceProduct}
                />

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Catégories</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={categoryProduct}
                        onChange={this.handleChangeInputCategoryProduct}
                    >
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
                </Form.Group>

                <Label>Taille </Label>
                <InputText
                    type="text"
                    value={sizeProduct}
                    onChange={this.handleChangeInputSizeProduct}
                />

                <Label>Poids </Label>
                <InputText
                    type="text"
                    value={weightProduct}
                    onChange={this.handleChangeInputWeightProduct}
                />

                <Label>Quantité </Label>
                <InputText
                    type="number"
                    value={quantityProduct}
                    onChange={this.handleChangeInputQuantityProduct}
                />

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        as="select"
                        value={stockProduct}
                        onChange={this.handleChangeInputStockProduct}
                    >
                        <option></option>
                        <option>Oui</option>
                        <option>Non</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Promotion</Form.Label>
                    <Form.Control
                        as="select"
                        value={promotionProduct}
                        onChange={this.handleChangeInputPromotionProduct}
                    >
                        <option></option>
                        <option>Oui</option>
                        <option>Non</option>
                    </Form.Control>
                </Form.Group>
                
                <Label>Reporter : </Label>
                <InputText
                    type="text"
                    value={reporterProduct}
                    onChange={this.handleChangeInputReporterProduct}
                />

                <Button onClick={this.handleUpdateProduct}>Update product</Button>
                <CancelButton href={'/Dashboard'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

