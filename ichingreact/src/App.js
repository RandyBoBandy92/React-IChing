import React from 'react'


function Line() {
    return (
        <p>I am a line</p>
    )
}

function Trigram(props) {
    return (
        <div className="trigram">
            <Line/>
            <Line/>
            <Line/>
        </div>
    )
}

function Hexagram() {
    return (
        <div className="hexagram">
            <Trigram position="upper"/>
            <Trigram position="lower"/>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Hexagram/>
            </div>
        )
    }
}

export default App