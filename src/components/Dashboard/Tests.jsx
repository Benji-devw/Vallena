import React, { Component } from 'react'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import apiCall from '../../apiCall/Products_Api'

import styled from 'styled-components'
import Axios from 'axios'


const Title = styled.h1.attrs({
	className: 'h1',
})``
const Wrapper = styled.div`
	padding: 0 40px 40px 40px;
`
const Update = styled.div`
	color: #ef9b0f;
	cursor: pointer;
`
const Delete = styled.div`
	color: #ff0000;
	cursor: pointer;
`

class UpdateProduct extends Component {
	updProduct = event => {
		event.preventDefault()

		
		window.location.href = `/update/${this.props.id}`		// Lien => app.js

	}

	render() {
		return <Update onClick={this.updProduct}>Update</Update>
	}
}

class DeleteProduct extends Component {
	delproduct = event => {
		event.preventDefault()

		if (
			window.confirm(
				`Do tou want to delete the new ${this.props.id} permanently?`,
			)
		) {
			apiCall.deleteProductById(this.props.id)
			window.location.reload()
		}
	}

	render() {
			return <Delete onClick={this.delproduct}>Delete</Delete>
	}
}

export class ListProductsTest extends Component {
	constructor(props) {
		super(props)
		this.state = {
				newProducts: [],
				columns: [],
				isLoading: false,
		}
	}

	componentDidMount = () => {
			this.setState({ isLoading: true })

		Axios.get('http://localhost:4000/api').then(newProduct => {
				// console.log('newProducts', newProduct)
					this.setState({
							newProducts: newProduct.data.users,
							isLoading: false,
					})
			})
	}

	render() {
			const { newProducts, isLoading } = this.state

			// console.log(this.state.newProducts[0])

			// Tableau REACT
			const columns = [
					{
							Header: 'ID',
							accessor: '_id',
							filterable: true,
					},
					{
							Header: 'Nom',
							accessor: 'titleProduct',
							filterable: true,
					},
					
					{
							Header: 'Description',
							accessor: 'descriptionProduct',
							filterable: true,
					},            
					{
							Header: 'Prix',
							accessor: 'priceProduct',
							filterable: true,
					},
					{
							Header: 'Catégories',
							accessor: 'categoryProduct',
							filterable: true,
					},
					{
						Header: 'Dimensions',
						accessor: 'sizeProduct',
						filterable: true,
					},
					{
						Header: 'Poids',
						accessor: 'weightProduct',
						filterable: true,
					},
					{
						Header: 'Quantité',
						accessor: 'quantityProduct',
						filterable: true,
					},
					{
						Header: 'En stock',
						accessor: 'stockProduct',
						filterable: true,
					},
					{
							Header: 'Promotion',
							accessor: 'promotionProduct',
							filterable: true,
					},
					{
						Header: 'Crée par',
						accessor: 'reporterProduct',
						filterable: true,
					},
					// {
					//     Header: 'Time',
					//     accessor: 'time',
					//     Cell: props => <span>{props.value.join(' / ')}</span>,
					// },
					{
							Header: 'Date',
							accessor: 'createdAt',
					},
					{
							Header: '',
							accessor: '',
							Cell: function(props) {
									return (
											<span>
													<DeleteProduct id={props.original._id} />
											</span>
									)
							},
					},
					{
							Header: '',
							accessor: '',
							Cell: function(props) {
									return (
											<span>
													<UpdateProduct id={props.original._id} />
											</span>
									)
							},
					},
			]



			return (
				<Wrapper>
					<Title>Liste des Produits</Title>
		
						<ReactTable
							data={newProducts}
							columns={columns}
							loading={isLoading}
							defaultPageSize={10}
							showPageSizeOptions={true}
							minRows={0}
						/>
			
						
				</Wrapper>
			)
	}
}

