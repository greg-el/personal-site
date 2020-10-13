import { NONAME } from 'dns';
import React from 'react';
import Desktop from './Desktop';

interface BootScreenState {
    finish?: boolean,
}

interface BootScreenProps {
    baseWait: number,
    bootText: Array<string>,
}


class BootScreenHandler extends React.Component<BootScreenProps, BootScreenState>  {
    constructor(props: BootScreenProps) {
        super(props);
        this.state = {
            finish: false
        }
    }

    
    render() {
        let visible = this.state.finish === true ? "bootHidden" : "bootVisible"
        return (
            <div id="boot-wrapper" className={visible}>
                <div id="boot">
                {                
                    this.props.bootText.map(
                        (x, i) => {
                            if (i === this.props.bootText.length-1) {
                                setTimeout(() => {
                                        this.setState({finish: true})
                                    },
                                    this.props.baseWait*i+200
                                )
                                return NONAME;
                            } else {
                                return <BootLine key={i} text={x} waitTime={this.props.baseWait*i} />;
                            }
                        }
                    )
                }
                </div>
            </div>
        )
    }
}
  
interface BootLineProps {
    waitTime: number,
    text: string,
}
  
interface BootLineState {
    hidden: boolean,
}

class BootLine extends React.Component<BootLineProps, BootLineState> {
    constructor(props: BootLineProps) {
        super(props);
        this.state = {
            hidden: true,
        }
    }
  
    componentDidMount() {
        setTimeout(() =>
            this.setState({hidden : false}),
            this.props.waitTime
        ) 
    }
  
    render() {
        if (this.state.hidden === true) {
            return ''
        } else {
            return (
                <div className="bootLine">
                    <div className="bootText">{this.props.text}</div>
                </div>
            )
        }
    }
}



export default BootScreenHandler;