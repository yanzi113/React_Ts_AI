import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Stream from './components/Stream.tsx'
import AItalk from './components/AItalk'
function App() {
  const [count, setCount] = useState(0)
  const [inputData, setInputData] = useState<string>('初始值')

  async function sendData() {
    try{
      const response = await fetch('testpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputData
        })
      })
      if (!response.ok) {
        alert('请求失败')
        return
      }
      const data = await response.json()
      alert(data.param)
    }
    catch(err) {alert(err)}
  }
  return (
    <>
      {/* <div className="card">
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)}/>
        <button onClick={sendData}>点击我</button>
      </div> */}
      {/* <Stream></Stream> */}
      <AItalk></AItalk>
    </>
  )
}

export default App
