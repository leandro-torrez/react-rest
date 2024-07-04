import './App.css'
import AddUserList from './component/AddUserList/AddUserList'
import UserList from './component/UserList/UserList'
import { ModalProvider } from './context/modalContext'

function App() {

  return (
    <>
      {/* <UserList /> */}
      <ModalProvider>
        <AddUserList />
      </ModalProvider>
    </>
  )
}

export default App
