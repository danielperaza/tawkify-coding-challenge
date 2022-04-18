import styled from 'styled-components'
import { useCallback, useState } from "react";

const ListInputStyles = styled.div`
  border-left: 0 none;
  border-top: 0 none;
  border-right: 0 none;
  position: relative;

  label {
    display: inline-block;
    position: absolute;
    top: -1.3em;
    color: var(--blue);
  }

  input {
    font-size: 1.2rem;
    border-bottom: 2px var(--blue) solid;
    padding-bottom: 5px;
    width: 15em;

    &:invalid {
      border-bottom-color: var(--red);
    }
  }

  .items-list {
    list-style-type: disc;
    font-size: 1.25rem;
    color: var(--dark-gray);
    max-width: 50%;

    li > span {
      display: flex;
      justify-content: space-between;
    }

    &__remove-btn {
      font-size: 2.5rem;
      padding-left: 2em;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .error-message {
    color: var(--red);
    padding-top: 0.4rem;
    display: inline-block;
  }
`

export interface TListInputProps {
  label: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  max?: number
}

const ListInput: React.FC<TListInputProps> = ({
  label,
  placeholder,
  required,
  disabled,
  max
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('')
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      const input = (event.target as HTMLInputElement)
      const value = input.value
      if (value && (!max || Array.isArray(items) && items.length + 1 <= max)) {
        setItems(Array.isArray(items) ? [...items, value] : [value])
        input.value = ''
      } else if (max && items.length + 1 > max) {
        setErrorMessage('Maximum number of items reached')
      }
    }
  }

  const handleRemove = (index: number) => {
    setItems(items?.filter((elem, i) => i !== index))
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setErrorMessage('')
    }
  }, [])

  return (
    <ListInputStyles>
      <label htmlFor="list-input">{label}</label>
      <input
        id="list-input"
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleEnter}
        onChange={handleChange}
        required={required}
      />
      { errorMessage && (
        <>
          <br />
          <span className="error-message">{errorMessage}</span>
        </>
      )}
      {Array.isArray(items)  && items.length > 0 && (
        <ul className="items-list mt-2 pl-2">
          {items.map((item, key) => (
            <li key={key}>
              <span>
                {item}
                <button onClick={() => handleRemove(key)} className="items-list__remove-btn">&times;</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </ListInputStyles>
  )
}

export default ListInput
