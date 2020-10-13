import React from 'react';


interface DesktopProps {
}

interface DesktopState {
}

class DesktopHandler extends React.Component<DesktopState, DesktopProps> {
    constructor(props: DesktopProps) {
        super(props);
    }


    render() {
        return (
            <div id="desktop-wrapper">
                <div id="desktop"></div>
            </div>
        )
    }
}

const Desktop = <DesktopHandler />

export default Desktop;