import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {FirebaseContext} from '../firebase'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  console.log({FirebaseContext})
  const formik = useFormik({
    initialValues: {
      fullname:'',
      username:'',
      email:'',
      password:''
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
                .min(15, 'The Full name been had fifteen characters')
                .required('You must write your Full Name for create a account'),
      username: Yup.string()
                .min(5, 'The Username name been had five characters')
                .required('You must write your username for create a account'),
      email: Yup.string()
                .required('You must write your email for create a account'),
      password: Yup.string()
                .min(8, 'The Username name been had five characters')
                .required('You must write your password for create a account'),
    }),
    onSubmit: data => {
      try {
        firebase.database.collection('Registers').add(data)
        navigate('/Home')
      } catch (error) {
        console.log(error)
      }
    }
  });

  return (
    <>
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>

          <form onSubmit={formik.handleSubmit}>
            <h1 className='text-sky-600 m-4 text-3xl font-bold'>USER REGISTER</h1> 
            <div className='mb-4'>
              <label className='block text-blue-600 text-sm font-bold mb-2' htmlFor='fullname'>FULL NAME</label>
              {formik.touched.fullname && formik.errors.fullname ?(
              <div>
                <p className='text-red-600 font-light text-sm'>{formik.errors.fullname}*</p>
              </div>
            ):null}
              <input
                className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
                id='fullname'
                type='text'
                placeholder='Full Name'
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>                 
            <div className='mb-4'>
              <label className='block text-blue-600 text-sm font-bold mb-2' htmlFor='username'>USER NAME</label>
              {formik.touched.username && formik.errors.username ?(
              <div>
                <p className='text-red-600 font-light text-sm'>{formik.errors.username}*</p>
              </div>
            ):null}
              <input
                className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
                id='username'
                type='text'
                placeholder='User Name'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-blue-600 text-sm font-bold mb-2' htmlFor='email'>EMAIL</label>
              {formik.touched.email && formik.errors.email ?(
              <div>
                <p className='text-red-600 font-light text-sm'>{formik.errors.email}*</p>
              </div>
            ):null}
              <input
                className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
                id='email'
                type='email'
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-blue-600 text-sm font-bold mb-2' htmlFor='password'>PASSWORD</label>
              {formik.touched.password && formik.errors.password ?(
              <div>
                <p className='text-red-600 font-light text-sm'>{formik.errors.password}*</p>
              </div>
            ):null}
              <input
                className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
                id='password'
                type='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <button
              type='submit'
              className='bg-blue-600 hover-bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              value="send"
            >
              Register User
            </button>
            <p className="text-blue-600 text-sm mt-2">
                Already registered? <span onClick={() => navigate('/Login')} className="cursor-pointer underline">Login here</span>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Register