import ListInput from './list-input'

export interface IFormProps {
  className?: string
}

const Form: React.FC<IFormProps> = ({ className }) => (
  <form onSubmit={e => e.preventDefault()} className={className}>
    <ListInput
      label="Top 3 priorities"
      placeholder="Enter some text here..."
      required
      max={3}
    />
  </form>
)

export default Form
