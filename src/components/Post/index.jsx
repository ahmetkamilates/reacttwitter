import { BiMessageRounded } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import moment from 'moment/moment';
import 'moment/locale/tr';
import { auth, db } from '../../firebase/config';
import DropDown from './DropDown';
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import EditMode from './EditMode';

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState();


  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  useEffect(() => {
    const found = tweet.likes.find(
      (id) => id === auth.currentUser.uid
    );
    setIsLiked(found);
  }, [tweet]);

  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musunuz?")) {
   
      const tweetRef = doc(db, 'tweets', tweet.id);

      await deleteDoc(tweetRef);
    }
  };
  const toggleLike = async () => {
    const tweetRef = doc(db, 'tweets', tweet.id);

    await updateDoc(tweetRef, {
      likes: isLiked 
        ? arrayRemove(auth.currentUser.uid) 
        : arrayUnion(auth.currentUser.uid), 
    });
  };

  return (
    <div className="relative flex gap-3 p-3 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray">
              @{tweet.user.name?.toLowerCase().replace(' ', '_')}
            </p>
            <p className="text-gray">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>
        <div className="my-3">
          {isEditMode ? (
            <EditMode
              id={tweet.id}
              close={() => {
                setIsEditMode(false);
                setIsPicDeleting(false);
              }}
              isPicDeleting={isPicDeleting}
              setIsPicDeleting={setIsPicDeleting}
              isImage={tweet.imageContent}
              text={tweet.textContent}
            />
          ) : (
            <p>{tweet.textContent}</p>
          )}

          {tweet.imageContent && (
            <img
              className={`${isPicDeleting ? 'blur-sm' : ''}
              my-2 rounded-lg w-full object-cover mx-auto max-h-[340px] `}
              src={tweet.imageContent}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#44ff005a]">
            <FaRetweet />
          </div>
          <div
            onClick={toggleLike}
            className="flex  items-center  gap-1 p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#e263eb69]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}

            {tweet.likes.length}
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#6600ff62]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;