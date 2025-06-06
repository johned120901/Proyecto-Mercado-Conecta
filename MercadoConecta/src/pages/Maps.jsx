import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/providers/authContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Container from '../components/Container';
import ContainerMaps from '../components/ContainerMaps';

export default function Maps() {

  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const hasLogin = () => {
      if (!user) {
        navigate('/')
      }
    }

    hasLogin();
  });

  return (
    <div>
      <Header />
      <NavBar />
      <Container title="Mapa">
        <div className="space-y-4">
          <ContainerMaps />
        </div>
      </Container>
    </div>
  );
}
