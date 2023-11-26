import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../firebase'
import { useNavigate } from 'react-router-dom'



const Login = () => {
  const navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext);
  console.log({FirebaseContext})
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
        username: Yup.string()
                .min(5, 'The Username name been had five characters')
                .required('You must write your username for create a account'),
        password: Yup.string()
                .min(8, 'The Username name been had five characters')
                .required('You must write your password for create a account'),
    }),
    onSubmit: async (data) => {
        try {
          const userDoc = await firebase.database.collection('Registers').where('username', '==', data.username).get();
      
          if (userDoc.empty) {
            console.error('Nombre de usuario no encontrado');
          } else {
            const userData = userDoc.docs[0].data();
            if (userData.password === data.password) {
              console.log('Usuario autenticado');
              navigate('/Home')
            } else {
              console.error('Contraseña incorrecta');
            }
          }
        } catch (error) {
          console.error('Error durante el inicio de sesión:', error);
        }  
    },
  });

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-3xl">
        <form onSubmit={formik.handleSubmit}>
            <h1 className="text-sky-600 m-4 text-3xl font-bold">LOGIN</h1>
                    <div className="mb-4">
                        <label className="block text-blue-600 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        {formik.touched.username && formik.errors.username ?(
                            <div>
                                <p className='text-red-600 font-light text-sm'>{formik.errors.username}*</p>
                            </div>
                        ):null}
                            <input
                                className="shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-600 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        {formik.touched.password && formik.errors.password ?(
                            <div>
                                <p className='text-red-600 font-light text-sm'>{formik.errors.password}*</p>
                            </div>
                        ):null}
                            <input
                                className="shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none"
                                id="password"
                                type='password'
                                placeholder="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                    </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  );
};

export default Login;
