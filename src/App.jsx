import './App.css'
import AddUserList from './component/AddUserList/AddUserList'
import { ModalProvider } from './context/modalContext'

function App() {

  return (
    <>
      <ModalProvider>
        <AddUserList />
      </ModalProvider>
    </>
  )
}

export default App
