import { useState } from 'react';
import { ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { PublicationReactions } from '../lib/PublicationReactions';

export default function PublicationInfoBox({
  userId,
  publicationId,
  name,
  description,
  like,
  dislike,
  initialReaction,
  onCommerce
}) {
  const [likes, setLikes] = useState(like);
  const [dislikes, setDislikes] = useState(dislike);
  const [userReaction, setUserReaction] = useState(initialReaction);

  const handleReaction = async (type) => {
    try {
      const newReaction = await PublicationReactions.setReaction(userId, publicationId, type);

      if (userReaction === type) {
        // Se retiró la reacción
        if (type === 'like') setLikes(likes - 1);
        else setDislikes(dislikes - 1);
        setUserReaction(null);
      } else {
        // Se cambió o agregó la reacción
        if (type === 'like') {
          setLikes(likes + 1);
          if (userReaction === 'dislike') setDislikes(dislikes - 1);
        } else {
          setDislikes(dislikes + 1);
          if (userReaction === 'like') setLikes(likes - 1);
        }
        setUserReaction(newReaction);
      }
    } catch (error) {
      console.error('Error al actualizar reacción:', error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <div
        className="flex items-center gap-2 text-blue-600 text-sm mb-2 hover:text-blue-800 cursor-pointer"
        onClick={onCommerce}
      >
        <User size={18} />
        <span>{name}</span>
      </div>
      <p className="text-black text-base mb-4">{description}</p>
      <div className="flex gap-6 text-gray-600">
        <button
          onClick={() => handleReaction('like')}
          className={`flex items-center gap-1 hover:text-blue-500 ${
            userReaction === 'like' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          <ThumbsUp size={18} className={userReaction === 'like' ? 'text-blue-600' : ''} />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => handleReaction('dislike')}
          className={`flex items-center gap-1 hover:text-red-500 ${
            userReaction === 'dislike' ? 'text-red-600 font-bold' : ''
          }`}
        >
          <ThumbsDown size={18} className={userReaction === 'dislike' ? 'text-red-600' : ''} />
          <span>{dislikes}</span>
        </button>
      </div>
    </div>
  );
}
