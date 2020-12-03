import React from 'react'

class Trigram extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.trigramData.position}>

            </div>
        )
    }
}

export default Trigram