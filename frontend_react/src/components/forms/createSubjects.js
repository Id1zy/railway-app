import { useState, useEffect } from 'react'

import {connect} from 'react-redux'
import { create_subjects } from '../../api/axiosSubjects'



const CreateSubject = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [created, setCreated] = useState(false);

  const [formData, setFormData] = useState({
    name: ''
  })

  const { 
    name
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    console.log(formData);
    create_subjects(name);
    setCreated(true);
  }

  if (created){
    window.location.reload()
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Subjects</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={e=>onSubmit(e)} className="space-y-6">

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                 Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={name}
                    onChange={e=>onChange(e)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>



              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

}) (CreateSubject)