import Routers from "./routes/Routes"
import { UserProvider}from './component/UserContextApi'


function App() {
  return (
    <>
        <UserProvider>
         <Routers></Routers>
        </UserProvider>
      
    </>
  )
}

export default App