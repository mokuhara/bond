import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import PrivateRoute from "../../privateRoute"
import BizpackNew from "../../../pages/mypage/specialist/bizpack/new"

const BizpackRoutes: React.FC<RouteProps> = props => {
  return (
    <PrivateRoute path='/mypage/bizpack/new'>
      <BizpackNew />
    </PrivateRoute>
  )
}

export default BizpackRoutes


// const PrivateRoute: React.FC<RouteProps> = props => {
//   const auth = Cookies.get('bdt')
//   const isAuthenticated = Boolean(auth)

//   const rest = _.omit(props, ['component'])
//   return (
//     <Route
//       {...rest}
//       render={innerProps =>
//         isAuthenticated ? (
//           <Route {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: innerProps.location }
//             }}
//           />
//         )
//       }
//     />
//   )
// }

// export default PrivateRoute