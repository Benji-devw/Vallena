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
            catProduct: [],
            titleProduct: '',        descriptionProduct: '',
            priceProduct: '',        categoryProduct: '',
            sizeProduct: '',         weightProduct: '',
            quantityProduct: '',     reporterProduct: '',
            promotionProduct: false, stockProduct: true,
            visible: true,           notes: 0,
            comments: [],           imgCollection: '',
            isLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await apiCall.getProducts().then(product => {
            // console.log('products', product.data.products)
            this.setState({
                catProduct: product.data.products,
                isLoading: false,
            })
        })
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
        var preview = document.querySelector('#preview')
        var files = document.querySelector('input[type=file]').files;
        preview.innerHTML = '<div id="preview"></div>'
        const readAndPreview = (file) => {
            // Veillez à ce que `file.name` corresponde à nos critères d’extension
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
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


    handleIncludeNewProduct = async (e) => {
        e.preventDefault()
        
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct, visible, notes, comments } = this.state
        
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
                window.alert('Produit Ajouté !')
            })
        }
        
    }






    render() {
        // Filter catProduct
        const catSuggest = this.state.catProduct
        const categorySet = new Set(catSuggest.map(p => p.categoryProduct));
        const categories = Array.from(categorySet).sort();

        return (
            <Wrapper>
                <Form>

                <Title>Create Product</Title>

                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Control
                            placeholder="Nom du produit"
                            type="text"
                            onChange={this.handleChangeInputTitleProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">

                        <Form.Control
                            label="Catégorie"
                            as="select"
                            onChange={this.handleChangeInputCategoryProduct}
                        >
                            <option></option>
                            {categories.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom33">
                        <Form.Control
                            placeholder="Créer une catégorie"
                            type="text"
                            onChange={this.handleChangeInputCategoryProduct}
                            
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="8" controlId="validationCustom03">
                        <Form.Control as="textarea" rows="5"
                            placeholder="Description de produit..."
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
                            onChange={this.handleChangeInputPriceProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <InputText
                            placeholder='Taille... "xs/xxl..." "3 x 7 mm..."'
                            type="text"
                            onChange={this.handleChangeInputSizeProduct}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <InputText
                            placeholder='Poids... "2" "0.3"'
                            type="text"
                            onChange={this.handleChangeInputWeightProduct}
                            required
                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom07">
                        <InputText
                            placeholder="Quantité..."
                            type="number"
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
                            onChange={this.handleChangeInputReporterProduct}
                            required
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect9">
                        <Form.Check type="checkbox"
                            label="Visible"
                            onChange={this.handleChangeCheckboxVisible}
                        />
                    </Form.Group>  
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect10">
                        <Form.Check type="checkbox"
                            label="En stock"
                            onChange={this.handleChangeInputStockProduct}
                        />
                    </Form.Group> 
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect11">
                        <Form.Check type="checkbox"
                            label="En Promotion"
                            onChange={this.handleChangeInputPromotionProduct}
                        />
                    </Form.Group>
                </Form.Row>

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
                            // required
                        />
                    </Form.Group>
                </Form.Row> 

                <Form.Row className="justify-content-md-center p-3">
                    <div id="preview"></div>

                </Form.Row>
                

                <Button onClick={this.handleIncludeNewProduct}>Envoyer</Button>

                </Form>
            </Wrapper>
        )
    }
}

