import React, {Component} from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {Divider, Form, Dropdown, TextArea, Card, List} from 'semantic-ui-react'
import { greetingAction } from './actions/simpleAction';

const languageOptions = [
    {
        text: 'English',
        value: 'english',
        image: {
            avatar: true,
            src: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_United_States.png'
        },
    },
    {
        text: 'German',
        value: 'german',
        image: {
            avatar: true,
            src: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Germany.png'
        },
    },
    {
        text: 'Spanish',
        value: 'spanish',
        image: {
            avatar: true,
            src: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Spain.png'
        },
    },
    {
        text: 'French',
        value: 'french',
        image: {
            avatar: true,
            src: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_France.png'
        },
    }
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: null,
            names: []
        };
    }

    render() {
        return (
            <div className="app">
                <div className="main-container">
                    <div className="input-col">
                        <p>1. Select a language</p>
                        <Dropdown
                            placeholder='Select a language'
                            fluid
                            selection
                            options={languageOptions}
                            onChange={(event, data)=>{
                                this.setState({language:data.value});
                                setTimeout(()=>{this.props.simpleAction(this.state.language, this.state.names)}, 0)
                            }}
                        />

                        <Divider/>

                        <p>2. Type a list of names (one per line)</p>
                        <Form>
                            <TextArea
                                rows={9}
                                style={{fontSize:'calc(10px + 2vmin)'}}
                                placeholder='Names...'
                                onInput={(event, data)=>{
                                    this.setState({names:data.value.split('\n')});
                                    setTimeout(()=>{this.props.simpleAction(this.state.language, this.state.names)}, 0)
                                }}
                            />
                        </Form>

                    </div>
                    <div className="output-col">
                        <Card fluid style={{height: '100%'}}>
                            <Card.Content>
                                <Card.Header>
                                    Greetings in <strong>{this.state.language?this.state.language:'...'}</strong>
                                </Card.Header>
                            </Card.Content>
                            <Card.Content extra style={{height:'100%', overflow: 'auto'}}>
                                {this.props.greetings ? <List items={this.props.greetings}/> : <p>Select a language and type some names</p>}
                            </Card.Content>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        greetings: state.greetingsReducer.greetings
    });
}

const mapDispatchToProps = dispatch => ({
    simpleAction: (language, names) => dispatch(greetingAction(language, names))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
