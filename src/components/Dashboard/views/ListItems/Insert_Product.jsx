import React, { Component } from 'react'
import apiCallProdcuts from '../../../../apiCall/Call_Api'
import {Container, Form, Col} from 'react-bootstrap'
import styled from 'styled-components'


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
            forList: [],
            titleProduct: '',        descriptionProduct: '',
            priceProduct: '',        categoryProduct: '',
            sizeProduct: '',         weightProduct: '',
            quantityProduct: '',     reporterProduct: '',
            promotionProduct: false, stockProduct: true,

            tags: '', matter: '', composition: '', fabrication: '', color: '', oldPriceProduct: 0, yearCollection: '', entretien: '',
            novelty: false, displaySlideHome: false,

            visible: true,  notes: 0,
            comments: ['premier commentaire'],           
            isLoading: false,
            alert: ''
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        window.scrollTo({ top: 0 });
    }

    textArea = (text) => {
        let str = text.replace(/(?:\r\n|\r|\n)/g, '<br />')
        this.setState({ descriptionProduct: str })
    }
  
    // handleChangeInputDescriptionProduct = async event => {
    //     const descriptionProduct = event.target.validity.valid
    //         ? event.target.value
    //         : this.state.descriptionProduct

    //     this.setState({ descriptionProduct })
    // }
  
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
            } else { alert('Fichier incorrect !')}
        }
        if (files) {
            [].forEach.call(files, readAndPreview);
        }
        this.setState({ imgCollection: event.target.files })
    }


    handleIncludeNewProduct = async (e) => {
        // e.preventDefault()
        
        const { titleProduct, descriptionProduct, priceProduct, categoryProduct, sizeProduct, 
            weightProduct, quantityProduct, stockProduct, promotionProduct, reporterProduct, visible, notes, comments,
            tags, matter, composition, fabrication, color, oldPriceProduct, yearCollection, entretien, novelty, displaySlideHome} = this.state
            
            
            if (!titleProduct) {
            this.setState({ alert: "titleError" })
            } else if (!descriptionProduct) {
                this.setState({ alert: "descError" })
            } else if (!categoryProduct) {
                this.setState({ alert: "catError" })
            } else if (!sizeProduct) {
                this.setState({ alert: "sizeError" })
            } else if (!weightProduct) {
                this.setState({ alert: "weightError" })
            } else if (!quantityProduct) {
                this.setState({ alert: "qtyError" })
            } else if (!entretien) {
                this.setState({ alert: "entretienError" })
            } else if (!tags) {
                this.setState({ alert: "tagsError" })
            } else if (!matter) {
                this.setState({ alert: "matterError" })
            }else if (!composition) {
                this.setState({ alert: "compositionError" })
            }else if (!fabrication) {
                this.setState({ alert: "fabError" })
            }else if (!color) {
                this.setState({ alert: "colorError" })
            }else if (!yearCollection) {
                this.setState({ alert: "yearColError" })
            }
            else if (!this.state.imgCollection) {
                this.setState({ alert: "imgColError" })
            }
            
            
            else {  
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
                
                apiCallProdcuts.insertProduct(formData).then(res => {
                    // console.log('2 res.data......', res.data)
                    // window.alert('Produit Ajouté !')
                    // window.location = "/dashboard/listitems";
                    window.alert(`Modification désactivé !`)
                }).catch(function (erreur) { console.log(erreur)});
            }
        
    }



    render() {
        // Filter catList
        const categorySet = new Set(this.props.data.map(cat => cat.categoryProduct));
        const catList = Array.from(categorySet).sort();
        // Filter MatterList
        const matterSet = new Set(this.props.data.map(mat => mat.matter));
        const matterList = Array.from(matterSet).sort();
        // Filter ColorList
        const colorSet = new Set(this.props.data.map(col => col.color));
        const colorList = Array.from(colorSet).sort();
        // Filter CollectionList
        const collectionSet = new Set(this.props.data.map(yearCol => yearCol.yearCollection.toString()));
        const collectionList = Array.from(collectionSet).sort();
        return (
            <Container>
            <Wrapper>
                <Form>

                <h3 className="mb-5">Création d'un produit</h3>

                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom01"  className="d-flex align-items-end">
                        <Form.Control
                            placeholder="Nom du produit"
                            type="text"
                            onChange={(e) => this.setState({ titleProduct: e.target.value })}
                            required
                        />
                        <span className="text-danger">{this.state.alert === "titleError" && "champ incorrect"}</span>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Catégories</Form.Label>
                        <Form.Control
                            label="Catégories"
                            as="select"
                            onChange={(e) => this.setState({ categoryProduct: e.target.value })}
                        >
                            <option></option>
                            {catList.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}

                        </Form.Control>
                        <span className="text-danger">{this.state.alert === "catError" && "champ incorrect"}</span>

                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom33" className="d-flex align-items-end">
                        <Form.Control
                            placeholder="Créer une catégorie"
                            type="text"
                            onChange={(e) => this.setState({ categoryProduct: e.target.value })}
                        />
                        <span className="text-danger">{this.state.alert === "catError" && "champ incorrect"}</span>
                    </Form.Group>
                </Form.Row>


                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="8" controlId="validationCustom03">
                        <Form.Control as="textarea" rows="5"
                            placeholder="Description de produit..."
                            // onChange={(e) => this.setState({ descriptionProduct: e.target.value })}
                            onChange={(e) => this.textArea( e.target.value )}
                            required
                        />
                        <span className="text-danger">{this.state.alert === "descError" && "champ incorrect"}</span>
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

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Dimension</Form.Label>
                        <InputText
                            placeholder='Taille... "xs/xxl..." "3 x 7 mm..."'
                            type="text"
                            onChange={(e) => this.setState({ sizeProduct: e.target.value })}
                            required
                        />
                        <span className="text-danger">{this.state.alert === "sizeError" && "champ incorrect"}</span>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                        <Form.Label>Poids</Form.Label>
                        <InputText
                            placeholder='Poids "200g"'
                            type="text"
                            onChange={(e) => this.setState({ weightProduct: e.target.value })}
                            required
                        />            
                        <span className="text-danger">{this.state.alert === "weightError" && "champ incorrect"}</span>
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
                    <Form.Group as={Col} md="3" controlId="validationCustom26">
                        <Form.Label>Entretien</Form.Label>
                        <InputText
                            placeholder='Entretien'
                            type="text"
                            onChange={(e) => this.setState({ entretien: e.target.value })}
                        />
                        <span className="text-danger">{this.state.alert === "entretienError" && "champ incorrect"}</span>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom27">
                        <Form.Label>composition</Form.Label>
                        <InputText
                            placeholder='composition'
                            type="text"
                            onChange={(e) => this.setState({ composition: e.target.value })}
                        />              
                        <span className="text-danger">{this.state.alert === "compositionError" && "champ incorrect"}</span>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom028">
                        <Form.Label>fabrication</Form.Label>
                        <InputText
                            placeholder="fabrication"
                            type="text"
                            onChange={(e) => this.setState({ fabrication: e.target.value })}
                            required
                        />  
                                <span className="text-danger">{this.state.alert === "fabError" && "champ incorrect"}</span>
                    </Form.Group>
                </Form.Row>





                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom2656">
                        <Form.Label>Matière</Form.Label>
                        <Form.Control
                            label="Matière"
                            as="select"
                            onChange={(e) => this.setState({ matter: e.target.value })}
                        >
                            <option></option>
                            {matterList.map((matter, index) => (
                                <option key={index}>{matter}</option>
                            ))}
                        </Form.Control>
                        <span className="text-danger">{this.state.alert === "matterError" && "champ incorrect"}</span>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom336"  className="d-flex align-items-end">
                        <Form.Control
                            placeholder="Créer une matière"
                            type="text"
                            onChange={(e) => this.setState({ matter: e.target.value })}
                        />
                        <span className="text-danger">{this.state.alert === "catError" && "champ incorrect"}</span>
                    </Form.Group>
                </Form.Row>



                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom56">
                        <Form.Label>Couleur</Form.Label>
                        <Form.Control
                            label="Couleur"
                            as="select"
                            onChange={(e) => this.setState({ color: e.target.value })}
                        >
                            <option></option>
                            {colorList.map((color, index) => (
                                <option key={index}>{color}</option>
                            ))}
                        </Form.Control>
                        <span className="text-danger">{this.state.alert === "colorError" && "champ incorrect"}</span>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom25"  className="d-flex align-items-end">
                        <InputText
                            placeholder="Créer une couleur"
                            type="text"
                            onChange={(e) => this.setState({ color: e.target.value })}
                            required
                        />
                        <span className="text-danger">{this.state.alert === "colorError" && "champ incorrect"}</span>
                    </Form.Group>
                </Form.Row>



                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="4" controlId="validationCustom5446">
                        <Form.Label>Année Collection</Form.Label>
                        <Form.Control
                            label="Créer une Collection"
                            as="select"
                            onChange={(e) => this.setState({ yearCollection: e.target.value })}
                        >
                            <option></option>
                            {collectionList.map((collection, index) => (
                                <option key={index}>{collection}</option>
                            ))}
                        </Form.Control>
                        <span className="text-danger">{this.state.alert === "yearColError" && "champ incorrect"}</span>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom23325"  className="d-flex align-items-end">
                        <InputText
                            placeholder="Créer une Collection"
                            type="number"
                            onChange={(e) => this.setState({ yearCollection: e.target.value })}
                            required
                        />
                        <span className="text-danger">{this.state.alert === "yearColError" && "champ incorrect"}</span>
                    </Form.Group>
                </Form.Row>



                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} md="6" controlId="validationCustom25">
                        <Form.Label>Mot clé</Form.Label>
                        <InputText
                            placeholder="Mot clé..."
                            type="text"
                            onChange={(e) => this.setState({ tags: e.target.value })}
                            required
                        />
                        <span className="text-danger">{this.state.alert === "tagsError" && "champ incorrect"}</span>
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
                            onChange={(e) => this.setState({ promotionProduct: e.target.checked, novelty: false  })} 
                        />
                        {this.state.promotionProduct && 
                            <InputText className={`${this.state.promotionProduct ? '' : 'hide-div'}`}
                                placeholder="Encien prix"
                                type="number"
                                onChange={(e) => this.setState({ oldPriceProduct: e.target.value})}
                                required
                            />
                        }
                    </Form.Group>


                    <Form.Group as={Col} md="2" controlId="exampleForm.ControlSelect31">
                        <Form.Check type="checkbox"
                            label="Nouveauté"
                            checked={this.state.novelty}
                            onChange={(e) => this.setState({ novelty: e.target.checked, promotionProduct: false })}
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
                        <span className="text-danger">{this.state.alert === "imgColError" && "Images manquantes"}</span>
                    </Form.Group>
                </Form.Row> 

                <Form.Row className="justify-content-md-center m-3">
                    <div id="preview" style={{
                        boxShadow: "0 0 5px rgba(0, 0, 0, .3)"
                    }}></div>

                </Form.Row>
                

                <Button onClick={this.handleIncludeNewProduct} disabled>Créer le produit</Button>

                </Form>
            </Wrapper>
            </Container>
        )
    }
}

