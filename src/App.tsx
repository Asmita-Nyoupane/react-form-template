
import './App.css'
import Form from './components/Form'
import formSchema from './data/contact.json'
import userProfile from './data/user-profile.json'
import jobApplication from './data/job-application.json'
export type TSchema =
  {
    name: string,
    fields: TFields[]

  }
export type TFields = {
  name: string,
  type: string,
  label: string,
  placeholder: string,
  required: boolean
  options?: {
    value: string,
    label: string
  }[],
  multiple?: boolean
  accept?: string
}
function App() {


  return (
    <div className='container mx-auto my-20  border rounded-lg shadow-lg
    px-8 py-10'>
      <header className=' text-2xl  md:text-4xl  lg:text-6xl text-bold  md:text-extrabold'>{userProfile.title}</header>
      <Form Schema={userProfile.fields} />
    </div>
  )
}

export default App
