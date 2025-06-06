import React, { useState } from 'react';

export default function Container({ title, children }) {
  return (
    <div className="min-h-screen bg-[#D9D9D9] p-8 m-8">
      <h1 className="text-5xl font-bold">{title}</h1>
      {children}
    </div>
  );
}