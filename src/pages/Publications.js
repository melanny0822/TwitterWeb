import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

const Publications = () => {
  const { firebase } = useContext(FirebaseContext);
  const [tweet, setTweet] = useState('');
  const [comment, setComment] = useState('');
  const [tweets, setTweets] = useState([]);

  const getCurrentDateTime = () => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date().toLocaleString(undefined, options);
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetsSnapshot = await firebase.database.collection('Tweets').get();
        const tweetsData = tweetsSnapshot.docs.map((doc) => doc.data());
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching tweets from Firebase', error);
      }
    };

    fetchTweets();
  }, [firebase]);

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleTweetSubmit = async (e) => {
    e.preventDefault();

    if (tweet.length > 280) {
      alert('The tweet cannot exceed 280 characters.');
      return;
    }

    const newTweet = {
      fullName: '@FULLNAME',
      username: 'USERNAME',
      dateTime: getCurrentDateTime(),
      body: tweet,
      comments: [],
    };

    try {
      const tweetRef = await firebase.database.collection('Tweets').add(newTweet);
      const tweetWithId = { ...newTweet, id: tweetRef.id };
      setTweets([...tweets, tweetWithId]);
      setTweet('');
    } catch (error) {
      console.error('Error saving the tweet to Firebase', error);
    }
  };

  const handleCommentSubmit = async (e, tweetIndex) => {
    e.preventDefault();

    const newCommentContent = comment;

    const updatedTweets = [...tweets];
    const updatedTweet = { ...updatedTweets[tweetIndex] };

    const newComment = {
      author: '@FULLNAME',
      content: newCommentContent,
    };

    try {
      await firebase.database
        .collection('Tweets')
        .doc(updatedTweet.id)
        .update({
          comments: [...updatedTweet.comments, newComment],
        });
      updatedTweet.comments.push(newComment);
      updatedTweets[tweetIndex] = updatedTweet;
      setTweets(updatedTweets);
      setComment('');
    } catch (error) {
      console.error('Error saving the comment to Firebase', error);
    }
  };

  return (
    <div className='flex justify-center mt-10'>
      <div className='w-full max-w-3xl'>
        <h1 className='text-sky-600 m-4 text-3xl font-bold'>PUBLICATIONS</h1>

        {/* Form for posting a tweet */}
        <form onSubmit={handleTweetSubmit}>
          <div className='mb-4'>
            <label
              className='block text-blue-600 text-sm font-bold mb-2'
              htmlFor='tweet'
            >
              New Tweet
            </label>
            <textarea
              className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
              id='tweet'
              value={tweet}
              onChange={handleTweetChange}
              rows='4'
              placeholder='Write your tweet (maximum 280 characters)'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 hover-bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Post
          </button>
        </form>

        {/* List of tweets */}
        <div className='mt-8'>
          <h2 className='text-lg font-semibold mb-4'>Recent Tweets</h2>
          <ul>
            {tweets.map((tweet, index) => (
              <li key={tweet.id} className='mb-4 p-4 border border-gray-300 rounded'>
                <p>
                  <strong>
                    {tweet.fullName}, @{tweet.username} - {tweet.dateTime}
                  </strong>
                </p>
                <p>{tweet.body}</p>

                {/* Form for commenting on a tweet */}
                <form onSubmit={(e) => handleCommentSubmit(e, index)}>
                  <div className='mb-2'>
                    <textarea
                      className='shadow appearance-none border w-full py-2 text-gray-800 leading-tight focus:outline-none'
                      id={`comment-${index}`}
                      value={comment}
                      onChange={handleCommentChange}
                      rows='2'
                      placeholder='Write a comment...'
                    />
                  </div>
                  <button
                    type='submit'
                    className='bg-blue-600 hover-bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Comment
                  </button>
                </form>

                {/* List of comments for this tweet */}
                <div className='mt-4'>
                  <ul>
                    {tweet.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className='mb-2 text-gray-600'>
                        <strong>{comment.author}</strong>: {comment.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Publications;

