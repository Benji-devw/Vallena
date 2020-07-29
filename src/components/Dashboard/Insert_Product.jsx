import React, { Component } from 'react'
import apiCall from '../../apiCall/Products_Api'

import Form from 'react-bootstrap/Form'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`
const Label = styled.label` margin: 5px;
`
const InputText = styled.input.attrs({ className: 'form-control', })`
    margin: 5px;
`
const Button = styled.button.attrs({ className: `btn btn-primary`, })`
    margin: 15px 15px 15px 5px;
`

// const CancelButton = styled.a.attrs({
//     className: `btn btn-danger`,
// })`
//     margin: 15px 15px 15px 5px;
// `

export class InsertProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
        this.handleChangeInputStockProduct = this.handleChangeInputStockProduct.bind(this);
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
        console.log('quantityProduct', quantityProduct)
        this.setState({ quantityProduct })
    }

    handleChangeInputStockProduct = async event => {
        const stockProduct = event.target.value
        this.setState({ stockProduct })
    //     const target = event.target;
    //     const value = target.name === 'stockProduct' ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     });
    }

    handleChangeInputPromotionProduct = async event => {
        const promotionProduct = event.target.value
        this.setState({ promotionProduct })
        // const target = event.target;
        // const value = target.name === 'promotionProduct' ? target.checked : target.value;
        // const name = target.name;
        // this.setState({
        //     [name]: value
        // });
    }

    handleChangeInputReporterProduct = async event => {
        const reporterProduct = event.target.value
        this.setState({ reporterProduct })
    }

    handleIncludeNewProduct = async () => {
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct } = this.state
        const payload = { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct }

        await apiCall.insertProduct(payload).then(res => {          // liens => src/api/index.js
            window.alert(`NewProduct inserted successfully`)
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
        })
    }

    render() {
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct } = this.state


        return (

            <Wrapper>

                <Title>Create Product</Title>

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

                <Button onClick={this.handleIncludeNewProduct}>Add NewProduct</Button>
                {/* <CancelButton href={'/newsHome/list'}>Cancel</CancelButton> */}
            </Wrapper>
        )
    }
}

