import React from 'react'
import LineZoom from 'react-d3-zoom'
import PropTypes from 'prop-types'

class d3linezoomchart extends React.Component{

    constructor(props){
        super(props)
        this.state={
            title : 'new title',
            width: '600',
            height: '700'
        }
    }

    render(){
        return (
            <LineZoom 
            title={this.state.title}
            width={this.state.width}
            height = {this.state.height}
            />
        )
    }
}

export default d3linezoomchart