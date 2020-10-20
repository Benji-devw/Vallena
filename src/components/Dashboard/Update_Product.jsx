import React, { Component } from 'react'
import apiCall from '../../apiCall/Products_Api'
import { Container, Form, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
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



export class ProductUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            forList: [],
            id: this.props.match.params.id,
            imgCollection: [],      imgCollectionCopy: [],
            titleProduct: '',       descriptionProduct: '',
            priceProduct: '',       categoryProduct: '',
            sizeProduct: '',        weightProduct: '',
            quantityProduct: '',    reporterProduct: '',
            tags: '',   matter: '', composition: '', fabrication: '',  
            color: '', oldPriceProduct: '', yearCollection: '', entretien: '',
            novelty: true, displaySlideHome: true,

            visible: true, 
            stockProduct: true,
            promotionProduct: true, 

            notes: [], comments: [], 
        }
        this.handleChangeImgCollection = this.handleChangeImgCollection.bind(this)
    }


    handleChangeInputDescriptionProduct = async event => {
        const descriptionProduct = event.target.validity.valid
            ? event.target.value
            : this.state.descriptionProduct
        this.setState({ descriptionProduct })
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
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, 
            sizeProduct, weightProduct, quantityProduct, stockProduct, promotionProduct, 
            reporterProduct, visible, tags, matter, composition, fabrication, color, 
            oldPriceProduct, yearCollection, entretien, novelty, displaySlideHome } = this.state
        
            
        const newCollection = this.state.imgCollection
        // console.log('newCollection', newCollection)
        const copyCollection = this.state.imgCollectionCopy
        // console.log('copyCollection', copyCollection)

            for (const key of Object.keys(newCollection)) {           // Crée un nouvel objet FormData et construit une paires clé/valeur représentant les champs du formulaire et leurs valeurs,
            formData.append('imgCollection', newCollection[key])     // Ajoute une nouvelle valeur à une clé existante dans un objet FormData, ou ajoute la clé si elle n'existe pas encore.
            }
            for (const key of Object.keys(copyCollection)) {
                formData.append('copyCollection', copyCollection[key])
            }

       
         

        // formData.append('copyCollection', copyCollection)
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

        alert('Modification désactivé !')

        apiCall.updateProductById(id, formData)
        .then(res => {    
                // console.log('2 UPDATE res.data......', res)
                window.alert(`Modification désactivé !`)
                // window.alert(`Modification OK !`)
                // window.location = "/dashboard/listitems";
            }).catch(err => { 
                // console.log(err)
                console.log(`Modification désactivé !`)
             } ) 
    }


    componentDidMount = async () => {
        window.scrollTo({ top: 0 });
        const { id } = this.state
        const product = await apiCall.getProductById(id)        // Lien => src/apiCall/index.js
        // console.log('product', product)
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
            tags: product.data.data.tags,
            matter: product.data.data.matter,
            composition: product.data.data.composition,
            fabrication: product.data.data.fabrication,
            color: product.data.data.color,
            entretien: product.data.data.entretien,
            novelty: product.data.data.novelty,
            displaySlideHome: product.data.data.displaySlideHome,
            oldPriceProduct: product.data.data.oldPriceProduct,
            yearCollection: product.data.data.yearCollection,
            stockProduct: product.data.data.stockProduct,
            promotionProduct: product.data.data.promotionProduct,
            reporterProduct: product.data.data.reporterProduct,
            visible: product.data.data.visible,
        })
        apiCall.getProducts().then(products => {
            this.setState({ forList: products.data.products})
        })
    }



    render() {
        // console.log('imgCollection', this.state.imgCollection)
        // console.log('imgCollectioncopy', this.state.imgCollectionCopy)
        
        const {imgCollection, forList} = this.state
        const imgDisplay = []

        for (let i = 0; i < imgCollection.length; i++) {
            imgDisplay.push(<img src={imgCollection[i]} key={[i]} alt="img" className="img-responsive m-3" style={{ height: '200px' }} />);
        }

        // Filter catList
        const categorySet = new Set(forList.map(cat => cat.categoryProduct));
        const catList = Array.from(categorySet).sort();
        // Filter MatterList
        // const matterSet = new Set(forList.map(p => p.matter));
        // const matterList = Array.from(matterSet).sort();
        // Filter ColorList
        // const colorSet = new Set(forList.map(p => p.color));
        // const colorList = Array.from(colorSet).sort();
        // Filter CollectionList
        // const collectionSet = new Set(forList.map(p => p.yearCollection.toString()));
        // const collectionList = Array.from(collectionSet).sort();

        return (
            <Wrapper>
                <Container>
                <Form>  

                <Title style={{marginTop:"7rem"}} className="">Update product</Title>

                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Control
                            placeholder="Nom du produit"
                            type="text"
                            defaultValue={this.state.titleProduct}
                            onChange={(e) => this.setState({ titleProduct: e.target.value })}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Control
                            label="Catégorie"
                            as="select"
                            onChange={(e) => this.setState({ categoryProduct: e.target.value })}
                        >
                            <option>{this.state.categoryProduct}</option>
                            {catList.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}

                        </Form.Control>
                        {/* <span className="text-danger">{this.state.alert === "catError" && "champ incorrect"}</span> */}

                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom33">
                        <Form.Control
                            placeholder="Créer une catégorie"
                            type="text"
                            onChange={(e) => this.setState({ categoryProduct: e.target.value })}
                        />
                        {/* <span className="text-danger">{this.state.alert === "catError" && "champ incorrect"}</span> */}
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
                            onChange={(e) => this.setState({ priceProduct: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Dimension</Form.Label>
                        <InputText
                            placeholder='Taille... "xs/xxl..." "3 x 7 mm..."'
                            type="text"
                            defaultValue={this.state.sizeProduct}
                            onChange={(e) => this.setState({ sizeProduct: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <Form.Label>Poids</Form.Label>
                        <InputText
                            placeholder='Poids... "2" "0.3"'
                            type="text"
                            defaultValue={this.state.weightProduct}
                            onChange={(e) => this.setState({ weightProduct: e.target.value })}
                            required
                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom07">
                        <Form.Label>Quantités</Form.Label>
                        <InputText
                            placeholder="Quantité..."
                            type="number"
                            defaultValue={this.state.quantityProduct}
                            onChange={(e) => this.setState({ quantityProduct: e.target.value })}
                            required
                        />  
                    </Form.Group>
                </Form.Row>
    


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="3" controlId="validationCustom26">
                        <Form.Label>Entretien</Form.Label>
                        <InputText
                            placeholder='Entretien'
                            type="text"
                            defaultValue={this.state.entretien}
                            onChange={(e) => this.setState({ entretien: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom26">
                        <Form.Label>Matière</Form.Label>
                        <InputText
                            placeholder='Matière'
                            type="text"
                            defaultValue={this.state.matter}
                            onChange={(e) => this.setState({ matter: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom27">
                        <Form.Label>composition</Form.Label>
                        <InputText
                            placeholder='composition'
                            type="text"
                            defaultValue={this.state.composition}
                            onChange={(e) => this.setState({ composition: e.target.value })}
                        />               
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom028">
                        <Form.Label>fabrication</Form.Label>
                        <InputText
                            placeholder="fabrication"
                            type="text"
                            defaultValue={this.state.fabrication}
                            onChange={(e) => this.setState({ fabrication: e.target.value })}
                            required
                        />  
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="3" controlId="validationCustom25">
                        <Form.Label>Couleur</Form.Label>
                        <InputText
                            placeholder="Couleur"
                            type="text"
                            defaultValue={this.state.color}
                            onChange={(e) => this.setState({ color: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom25">
                        <Form.Label>Année Collection</Form.Label>
                        <InputText
                            placeholder="Année Collection"
                            type="number"
                            defaultValue={this.state.yearCollection}
                            onChange={(e) => this.setState({ yearCollection: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom25">
                        <Form.Label>Mot clé</Form.Label>
                        <InputText
                            placeholder="Mot clé..."
                            type="text"
                            defaultValue={this.state.tags}
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
                            defaultValue={this.state.reporterProduct}
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
                                defaultValue={this.state.oldPriceProduct}
                                onChange={(e) => this.setState({ oldPriceProduct: e.target.value })}
                            
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
                                // required
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
                <Link to= "/dashboard/listitems">Cancel</Link>

            </Form>
            </Container>
            </Wrapper>
        )
    }
}

