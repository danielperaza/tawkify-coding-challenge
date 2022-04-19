import ListInput from './list-input'
import React, { useEffect, useState } from "react";

export interface IFormProps {
  className?: string
}

const Form: React.FC<IFormProps> = ({ className }) => {
  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      try {
        const items = await fetch('/api/items')
          .then((response) => {
            if (!response.ok || response.status < 200 || response.status > 299) {
              throw new Error(response.statusText);
            }
            return response;
          })
          .then((response) => response.json());
        setData(items)
      } catch (error) {
        setData([])
      }
    })()
  }, [])

  const handleChange = async (items: string[]) => {
    await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    })
    setData(items)
  }

  return (
    <form onSubmit={e => e.preventDefault()} className={className}>
      <ListInput
        label="Top 3 priorities"
        placeholder="Enter some text here..."
        items={data}
        onChange={handleChange}
        required
        max={3}
      />
    </form>
  );
}

export default Form
