import React, { Component } from 'react'
import apiCall from '../../../../apiCall/Products_Api'
import {Container, Form, Col} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components'

// const Title = styled.h1.attrs({
//     className: 'h1',
// })``

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
            imgCollection: [],
            catProduct: [],
            titleProduct: '',        descriptionProduct: '',
            priceProduct: '',        categoryProduct: '',
            sizeProduct: '',         weightProduct: '',
            quantityProduct: '',     reporterProduct: '',
            promotionProduct: false, stockProduct: true,

            tags: '', matter: '', composition: '', fabrication: '', color: '', oldPriceProduct: 0, yearCollection: '', entretien: '',
            novelty: true, displaySlideHome: true,

            visible: true,  notes: 0,
            comments: ['premier commentaire'],           
            isLoading: false,
            alert: false
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
        window.scrollTo({ top: 0 });
    }
    
    handleChangeInputDescriptionProduct = async event => {
        const descriptionProduct = event.target.validity.valid
            ? event.target.value
            : this.state.descriptionProduct

        this.setState({ descriptionProduct })
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
        
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, 
            weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct, visible, notes, comments,
            tags, matter, composition, fabrication, color, oldPriceProduct, yearCollection, entretien, novelty, displaySlideHome} = this.state
            
            // if (!titleProduct || !descriptionProduct || !priceProduct || !categoryProduct || 
            //     !sizeProduct || !weightProduct || !quantityProduct || !reporterProduct)
            //     { this.setState({alert: "champ incorrect"}) }

                if (!titleProduct) {
                     this.setState({ alert: "titleError" }) 
                } else if (!sizeProduct) {
                     this.setState({ alert: "sizeError" }) 
                } else if (!weightProduct) {
                    this.setState({ alert: "weightError" })
                } else if (!entretien) {
                    this.setState({ alert: "entretienError" })
                } else if (!matter) {
                    this.setState({ alert: "matterError" })
                } else if (!composition) {
                    this.setState({ alert: "compositionError" })
                }
            
            
            else {  
                    console.log('test');
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
            formData.append('tags', tags)
            formData.append('matter', matter)
            formData.append('composition', composition)
            formData.append('fabrication', fabrication)
            formData.append('color', color)
            formData.append('oldPriceProduct', oldPriceProduct)
            formData.append('yearCollection', yearCollection)
            formData.append('entretien', entretien)
            formData.append('novelty', novelty)
            formData.append('displaySlideHome', displaySlideHome)
            formData.append('stockProduct', stockProduct)
            formData.append('promotionProduct', promotionProduct)
            formData.append('reporterProduct', reporterProduct)
            formData.append('visible', visible)
            formData.append('notes', notes)
            formData.append('comments', comments)
            
            apiCall.insertProduct(formData).then(res => {
                console.log('2 res.data......', res.data)
                window.alert('Produit Ajouté !')
                window.location = "/dashboard/listitems";

            }).catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                console.log(erreur);
            });
        }
        
    }



    render() {
        // Filter catProduct
        const catSuggest = this.state.catProduct
        const categorySet = new Set(catSuggest.map(p => p.categoryProduct));
        const categories = Array.from(categorySet).sort();

        // console.log(this.state.matter);
        return (
            <Container>
            <Wrapper>
                <Form>

                <h3 className="mb-5">Création d'un produit</h3>

                <Form.Row className="justify-content-md-center">
                    <TextField
                            error={this.state.alert === "titleError" ? true : false}
                            variant="outlined"
                            label="Nom du produit"
                            placeholder="Nom du produit"
                            onChange={(e) => this.setState({ titleProduct: e.target.value })}
                            helperText={this.state.alert === "titleError" && "Champ incorrect"}
                  
                    />
                        {/* <span className="text-danger">{this.state.alert}</span> */}

                    <Form.Group as={Col} md="4" controlId="validationCustom02">

                        <Form.Control
                            label="Catégorie"
                            as="select"
                            // onChange={this.handleChangeInputCategoryProduct}
                            onChange={(e) => this.setState({ categoryProduct: e.target.value })}
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
                            // onChange={this.handleChangeInputCategoryProduct}
                            onChange={(e) => this.setState({ categoryProduct: e.target.value })}
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="8" controlId="validationCustom03">
                        <Form.Control as="textarea" rows="5"
                            placeholder="Description de produit..."
                            // onChange={this.handleChangeInputDescriptionProduct}
                            onChange={(e) => this.setState({ descriptionProduct: e.target.value })}
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
                            onChange={(e) => this.setState({ priceProduct: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <TextField
                            error={this.state.alert === "sizeError" ? true : false}
                            variant="outlined"
                            label='Taille... "xs/xxl..."'
                            placeholder='Taille... "xs/xxl..."'
                            type="text"
                            onChange={(e) => this.setState({ sizeProduct: e.target.value })}
                            helperText={this.state.alert === "sizeError" && "Champ incorrect"}
                        />
                  

                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <TextField
                            error={this.state.alert === "weightError" ? true : false}
                            variant="outlined"
                            label='Poids... "200g"'
                            placeholder='Poids... "200g'
                            type="text"
                            onChange={(e) => this.setState({ weightProduct: e.target.value })}
                            helperText={this.state.alert === "weightError" && "Champ incorrect"}

                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom07">
                        <Form.Label>Quantités</Form.Label>
                        <InputText
                            placeholder="Quantité..."
                            type="number"
                            onChange={(e) => this.setState({ quantityProduct: e.target.value })}
                            required
                        />  
                    </Form.Group>
                </Form.Row>
    


                <Form.Row className="justify-content-md-center">
                    <TextField
                            error={this.state.alert === "entretienError" ? true : false}
                            variant="outlined"
                            label="Entretien"
                            placeholder='Entretien'
                            type="text"
                            onChange={(e) => this.setState({ entretien: e.target.value })}
                            helperText={this.state.alert === "entretienError" && "Champ incorrect"}

                        />
              

                    <Form.Group as={Col} md="3" controlId="validationCustom26">
                        <TextField
                            error={this.state.alert === "matterError" ? true : false}
                            variant="outlined"
                            label="Matière"
                            placeholder='Matière'
                            type="text"
                            onChange={(e) => this.setState({ matter: e.target.value })}
                            helperText={this.state.alert === "matterError" && "Champ incorrect"}

                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom27">
                       <TextField
                            error={this.state.alert === "compositionError" ? true : false}
                            variant="outlined"
                            label="Composition"
                            placeholder='Composition'
                            type="text"
                            onChange={(e) => this.setState({ composition: e.target.value })}
                            helperText={this.state.alert === "compositionError" && "Champ incorrect"}

                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom028">
                        <TextField
                            error={this.state.alert === "fabricationError" ? true : false}
                            variant="outlined"
                            label="fabrication"
                            placeholder="fabrication"
                            type="text"
                            onChange={(e) => this.setState({ fabrication: e.target.value })}
                            helperText={this.state.alert === "fabricationError" && "Champ incorrect"}

                        />  
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="3" controlId="validationCustom25">
                        <Form.Label>Couleur</Form.Label>
                        <InputText
                            placeholder="Couleur"
                            type="text"
                            onChange={(e) => this.setState({ color: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom25">
                        <Form.Label>Année Collection</Form.Label>
                        <InputText
                            placeholder="Année Collection"
                            type="number"
                            onChange={(e) => this.setState({ yearCollection: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom25">
                        <Form.Label>Mot clé</Form.Label>
                        <InputText
                            placeholder="Mot clé..."
                            type="text"
                            onChange={(e) => this.setState({ tags: e.target.value })}
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
                            onChange={(e) => this.setState({ reporterProduct: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect9">
                        <Form.Check type="checkbox"
                            label="Visible"
                            checked={this.state.visible}
                            onChange={(e) => this.setState({ visible: e.target.checked })}
                        />
                    </Form.Group>  
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect10">
                        <Form.Check type="checkbox"
                            label="En stock"
                            checked={this.state.stockProduct}
                            onChange={(e) => this.setState({ stockProduct: e.target.checked })}
                        />
                    </Form.Group> 
                    
                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect11">
                        <Form.Check type="checkbox"
                            label="En Promotion"
                            checked={this.state.promotionProduct}
                            onChange={(e) => this.setState({ promotionProduct: e.target.checked })} 
                        />
                        {this.state.promotionProduct && 
                            <InputText className={`${this.state.promotionProduct ? '' : 'hide-div'}`}
                                placeholder="Encien prix"
                                type="number"
                                onChange={(e) => this.setState({ oldPriceProduct: e.target.value })}
                                required
                            />
                        }
                        
                    </Form.Group>


                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect31">
                        <Form.Check type="checkbox"
                            label="Nouveauté"
                            checked={this.state.novelty}
                            onChange={(e) => this.setState({ novelty: e.target.checked })}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect32">
                        <Form.Check type="checkbox"
                            label="Affichage home"
                            checked={this.state.displaySlideHome}
                            onChange={(e) => this.setState({ displaySlideHome: e.target.checked })}
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
                            required
                        />
                    </Form.Group>
                </Form.Row> 

                <Form.Row className="justify-content-md-center p-3">
                    <div id="preview"></div>

                </Form.Row>
                

                <Button onClick={this.handleIncludeNewProduct}>Envoyer</Button>

                </Form>
            </Wrapper>
            </Container>
        )
    }
}

