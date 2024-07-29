import './App.css'
import Dropdown from "./components/Dropdown.tsx";

const options: string[] = [
    'Option 1',
    'Option with icon',
    'Long long option 3',
    'Long long long option 4',
    'Long long long long option 5',
    'Long long long long long option 6',
]

function App() {
    const handleChange = (e: unknown) => {
        console.log('Selected option', e)
    }

  return (
    <>
      <Dropdown options={options} onChange={(e) => handleChange(e)} />
    </>
  )
}

export default App
