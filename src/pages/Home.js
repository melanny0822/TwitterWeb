import React, { useState, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from "@material-tailwind/react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../firebase'

const Home = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [newsData, setNewsData] = useState([])
  const {firebase} = useContext(FirebaseContext)

  const newData = [
    {
      id: 1,
      title: 'Santi Perdomo: "The Education Councilor"',
      content: 'Let\'s do things right 🙌🏼, we\'ll keep working hard with FICO and recover Medellín 🥳. Vote for CREEMOS in the Medellín Council.',
      imgUrl: 'https://static.wixstatic.com/media/77b431_a1f11957a5b44ff2a4f84206c630abc2~mv2.jpg/v1/fit/w_2500,h_1330,al_c/77b431_a1f11957a5b44ff2a4f84206c630abc2~mv2.jpg',
    },
    {
      id: 2,
      title: '273 Love Stories',
      content: 'A podcast that is not a podcast, based on the 273 love stories I\'ve heard so far.',
      imgUrl: 'https://production.listennotes.com/podcasts/273-historias-de-amor-mar%C3%ADa-alejandra-merch%C3%A1n-1HibsYkNFAL-qSFls2DBINL.1400x1400.jpg',
    },
    {
      id: 3,
      title: 'Synod of Synonality',
      content: 'The Moment of Reflection had the presence of representatives of the People of God, including delegates from the International Meetings of the Episcopal Conferences and similar bodies, members of the Roman Curia, fraternal delegates, delegates of consecrated life and lay ecclesial movements, the youth council, etc.',
      imgUrl: 'https://siguenza-guadalajara.org/images/noticias/2021/octubre/Logo%20del%20Sinodo%202021-2022.jpg',
    },
  ];

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // Function to add a trending news
  const handleAddNews = () => {
    if (image) {
      const newNews = {
        id: Date.now(),
        title: title,
        content: content,
        imageUrl: URL.createObjectURL(image)
      };
  
      setNewsData([...newsData, newNews])
  
      setTitle('')
      setContent('')
      setImage(null)

    } else {
      console.error('No image selected')
    }
    
  };

  const formik = useFormik({
    initialValues: {
      title:'',
      content:'',
      image: null
    },
    validationSchema: Yup.object({
      title: Yup.string()
                .min(5, 'The minium of characters is 5')
                .required('please write the title of new'),
      content: Yup.string()
                .min(10,'the minium of characters is 10')
                .required('please write the content of new')
    }),
    onSubmit: data => {
      try{
        firebase.database.collection('NewNotice').add(data)
      }catch(e){
        console.log(e)
      }
    }
  })

  return (
    <div className='mx-4'>
      <h1 className='text-3xl font-bold mb-4'>For you</h1>
      <form onSubmit={formik.handleSubmit}>
      <div>
        <Button>
          <NavLink className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline" end to="/Publications"> Publications </NavLink>
        </Button>

         {/* Form to add trending news */}
          <div className='mb-4'>
            <label className='block text-blue-600 mt-8 mb-2 text-sm font-bold' htmlFor='title'>
              News Title
            </label>
            {formik.touched.title && formik.errors.title ?(
              <div>
                 <p className='text-gray-600 font-light text-sm'>{formik.errors.title}*</p>
              </div>
            ):null}
            <input
              type='text'
              id='title'
              className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
              placeholder='Enter the news title'
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-blue-600 text-sm font-bold mb-2' htmlFor='content'>
              News Content
            </label>
            <textarea
              id='content'
              className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
              placeholder='Enter the news content'
              rows='4'
              value={formik.values.content}
              onChange={formik.handleChange}
            />
          </div>

          <div className='mb-4'>
          <label className='block text-blue-600 text-sm font-bold mb-2' htmlFor='image'>
            Upload Image
          </label>
          <input
            type='file'
            id='image'
            accept='image/*'
            value={formik.values.image}
            onChange={handleImageChange}
          />
        </div>

          <button
            type='button' 
            className='bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={handleAddNews}
          >
            Add News
          </button>
        </div>
      </form>

      {/* Display trending news */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {newsData.map((newsItem) => (
          <div key={newsItem.id} className='bg-white p-4 shadow-lg rounded'>
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className='w-full h-52 object-contain mb-4 rounded'
            />
            <h2 className='text-xl font-semibold'>{newsItem.title}</h2>
            <p className='text-gray-600'>{newsItem.content}</p>
          </div>
        ))}
      </div>

      {/* Display new data */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {
          newData.map((newItem) => (
            <div key={newItem.id} className='bg-white p-4 mt-5 shadow-lg rounded'>
              <img
                src={newItem.imgUrl}
                alt={newItem.title}
                className='w-full h-52 object-contain mb-2 rounded'
              />
              <h2 className='text-xl font-semibold'>{newItem.title}</h2>
              <p className='text-gray-700'>{newItem.content}</p>
            </div>
          ))
        }
      </div>   
    </div>
  );
};

export default Home