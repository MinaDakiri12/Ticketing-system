import React, {Fragment} from 'react'
import { Link, withRouter} from 'react-router-dom'



const NavTech = (props) =>{

    return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
              <Fragment>  
                <li className="nav-item active ml-auto">
                  <Link  className="nav-link" to="/logout"> <i className="fas fa-sign-out-alt mr-1"></i>Logout<span className="sr-only">(current)</span></Link >
                </li>
              
              </Fragment>
              

            
            </ul>
           
            
          </div>
      </nav>      
     </div>
    )
}

export default withRouter(NavTech)