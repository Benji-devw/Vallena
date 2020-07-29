import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import API from "../../../../utils/API";

const Collapse = styled.div.attrs({ className: 'collpase navbar-collapse', })``
const List = styled.div.attrs({ className: 'navbar-nav mr-auto', })``
const Item = styled.div.attrs({ className: 'collpase navbar-collapse', })``

class LinksAdmin extends Component {
    
    render() {

        const Greeting = () => {
            if (API.isAuth() === false) {
                return (
                    <>
                        <Item>
                            <Link to="/Login" email="test" className="nav-link">Login</Link>
                        </Item>
                        <Item>
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </Item>
                    </>
                )
            } else {
                return (
                    <Item>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </Item>
                )
            }
        }
        
        return (
            <React.Fragment>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="./vanduul" className="nav-link"> Vanduul </Link>
                        </Item>

                        {/* Login/Logout/Dashboard */}
                        <Item><Greeting /></Item>

                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default LinksAdmin
