import React, { useState, useEffect } from 'react';
import { Card, Image, Header } from 'semantic-ui-react';

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
    <Card>
      <Image
        src={img}
        alt={title}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          {`purchased `}
          <input
            type="checkbox" 
            checked={checked}
            onClick={() => setCheck(!checked)}           
          />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}