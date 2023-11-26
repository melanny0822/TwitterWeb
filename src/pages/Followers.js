import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import firebase from '../firebase'

const Followers = () => {
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [followersList, setFollowersList] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [followingStatus, setFollowingStatus] = useState({})

  useEffect(() => {

    const fetchData = async () => {
      const fakeFollowersList = [
        { id: 1, fullName: 'Andres Eliecer Berdugo', username: 'berdugo' },
        { id: 2, fullName: 'Melanny Arianna Cordoba', username: 'melanny.cordoba' },
        { id: 3, fullName: 'Vanessa Raigoza', username: 'vane.Rai' },
        { id: 4, fullName: 'Diego Morales Ossa', username: 'diego' },
        { id: 5, fullName: 'Juan Esteban Hernandez', username: 'juanes_306' },
        { id: 6, fullName: 'Andrey David Alzate', username: 'andreyGamero' },
        { id: 7, fullName: 'Juan Felipe Giraldo', username: 'pipe.giraldo' },
        { id: 8, fullName: 'Juan Camilo Luna', username: 'lunaaa :)' },
      ]

      const fakeFollowingList = [
        { idfollowing: 1, fullName: 'Camila Giraldo', username: 'cami_g' },
        { idfollowing: 2, fullName: 'Simon Perez', username: 'simon.p' },
        { idfollowing: 3, fullName: 'Karen Moreno', username: 'karen.moreno' },
        { idfollowing: 4, fullName: 'Carolina Molina', username: 'molinaCaro' },
        
      ]

      setFollowersCount(fakeFollowersList.length)
      setFollowingCount(fakeFollowingList.length)
      setFollowersList(fakeFollowersList)
      setFollowingList(fakeFollowingList)

      const initialFollowingStatus = {}
      fakeFollowersList.forEach((follower) => {
        initialFollowingStatus[follower.id] = false
      })
      setFollowingStatus(initialFollowingStatus)

      try{
        const followerCollection = firebase.database.collection('Followers')
        fakeFollowingList.forEach(async (follower) => {
          await followerCollection.add(follower)
        })
      } catch(error){
        console.error('Error adding followers to Firebase', error)

      }
    }

    fetchData()
  }, [])

  const followUser = (userId) => {
    setFollowingStatus((prevState) => ({
      ...prevState,
      [userId]: true,
    }))

    const userToFollow = followersList.find((user) => user.idfollowing === userId)
    setFollowingList([...followingList, userToFollow])

    setFollowingCount(followingCount + 1)


    try {
      firebase.database.collection('Following').add(userToFollow);
    } catch (error) {
      console.error('Error adding user to Following in Firebase', error);
    }

  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Followers Page</h2>

      <div className='mb-4'>
        <h3 className='text-xl font-bold mb-2'>Followers: {followersCount}</h3>
        <div className='border p-2'>
          <ul>
            {followersList.map((user) => (
              <li key={user.id} className='mb-2'>
                {user.fullName} (@{user.username}){' '}
                {!followingStatus[user.id] ? (
                  <button
                    onClick={() => followUser(user.id)}
                    className='bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Follow
                  </button>
                ) : (
                  <span>Already following</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='text-xl font-bold mb-2'>Following: {followingCount}</h3>
        <div className='border p-2'>
          <ul>
            {followingList.map((user) => (
              <li key={user.id} className='mb-2'>
                {user.fullName} (@{user.username})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <NavLink to="/Home" className='text-blue-600'>
        Back to Home
      </NavLink>
    </div>
  )
}

export default Followers