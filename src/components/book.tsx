import React, { useState, useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';

type TBookProps = {
  title: string,
  img: any
}

export default function Book({ title, img }: TBookProps) {
  const [checked, setCheck] = useState(false);
  if (checked) {
    window.alert(`${title} is checked!!!`);
  }
  return (
    <Container>
      <Container text>
        <Header as='h4'>{title}</Header>
        <input 
          type="checkbox" 
          checked={checked}
          onClick={() => setCheck(!checked)}           
        />
      </Container>
      <img
        className="book-img"
        src={img}
        alt={title}
      />
    </Container>
  );
}