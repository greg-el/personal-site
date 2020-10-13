import React, {useState} from 'react';
import './App.css';
import BootScreenHandler from './components/BootScreen';


interface DesktopProps {
}

interface DesktopState {
}

class App extends React.Component<DesktopState, DesktopProps> {
  constructor(props: DesktopProps) {
    super(props);
  }


  render() {
    const [screen, setScreen] = useState(0);
    return (
      <BootScreenHandler baseWait={600} bootText= {[
        "PENTIUM-S CPU at 166mhz",
        "Memory Test : 65536K OK",
        "E:>boot -l c",
        "Booting from drive C...",
        "Starting MS-DOS...",
        "",
        "",
        "HIMEM is testing extended memory...",
        "Reading MOUSEDRV.INI initilization file",
        "Searching for mouse...",
        "",
        "",
        "Boot sequence successful",
        "Loading visual environment..."
      ]}/>
    )
  }
}

export default App;
