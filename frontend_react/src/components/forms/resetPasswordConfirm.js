
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { reset_password_confirm } from '../../redux/actions/auth'
import Dotloader from "react-spinners/DotLoader";
import {Navigate, useParams} from 'react-router'


const Password_Reset_Confirm = ({
  reset_password_confirm,
  loading
}) => {
  const params = useParams()

  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  })

  const { 
    new_password,
    re_new_password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    const uid = params.uid
    const token = params.token
    console.log("salñkda",uid)

    reset_password_confirm(uid, token, new_password, re_new_password)
    if (new_password === re_new_password)
      setRequestSent(true);
  }
  if (requestSent && !loading){ return <Navigate to='/' />;}
       

  return (
<>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Contraseña</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={e=>onSubmit(e)} className="space-y-6">
              <div>
                <label htmlhtmlFor="email" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="new_password"
                    value={new_password}
                    onChange={e=>onChange(e)}
                    type="password"
                    placeholder="Password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlhtmlFor="email" className="block text-sm font-medium text-gray-700">
                  Repeat Password
                </label>
                <div className="mt-1">
                  <input
                    name="re_new_password"
                    value={re_new_password}
                    onChange={e=>onChange(e)}
                    type="password"
                    placeholder="Repeat Password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {loading ? 
                <button
                className="button_tech_2"
              >
                <Dotloader />
              </button>:
              <button
              type="submit"
              className="button_tech_2"
            >
              Reset password
            </button>}
              </div>
            </form>
          </div>
        </div>
      </div>

      </>

  )
}
const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  reset_password_confirm
}) (Password_Reset_Confirm)