import { useEffect, useState } from 'react';
import { useAuth } from '../components/providers/authContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Container from '../components/Container';
import PublicationInfoBox from '../components/PublicationInfoBox';
import { Publications } from '../lib/Publications';

export default function Dashboard() {
  const { user } = useAuth();
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPublications() {
      try {
        const data = await Publications.getWithUserReactions(user.id);
        setPublications(data);
      } catch (error) {
        console.error('Error al cargar publicaciones:', error.message);
      }
    }

    const hasLogin = () => {
      if (!user) {
        navigate('/')
      }
    }

    if (user?.id) {
      fetchPublications();
    }
    hasLogin();
  }, [user]);

  const handleNavigateCommerce = (id) => {
    navigate(`/commerce?id=${id}`)
  };

  return (
    <div>
      <Header />
      <NavBar />
      <Container title="Inicio">
        <div className="space-y-4">
          {publications.map(pub => (
            <PublicationInfoBox
              key={pub.id}
              userId={user?.id || ''}
              publicationId={pub.id}
              name={pub.commerce_name ?? 'Desconocido'}
              description={pub.content}
              like={pub.likes}
              dislike={pub.dislikes}
              initialReaction={pub.userReaction}
              onCommerce={() => handleNavigateCommerce(pub.commerce_id)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
