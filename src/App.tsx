
import './App.css'
import Form from './components/Form'
import formSchema from './data/contact.json'
import userProfile from './data/user-profile.json'
import jobApplication from './data/job-application.json'
import initialData from './data/initial-profile.json'
import { useState } from 'react'



function App() {
  const [formVal, setFormVal] = useState(
    userProfile.fields.reduce((acc, field) => {
      acc[field.name] = (initialData as Record<string, any>)?.[field.name] || "";
      return acc;
    }, {} as Record<string, string | string[]>)
  );
  const [errors, SetErrors] = useState<Record<string, string>>({})

  const [fileInputs, setFileInputs] = useState<Record<string, File | null>>({});
  const updateFormValue = (name: string, value: string | string[]) => {
    setFormVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateFileInput = (name: string, file: File | null) => {
    setFileInputs((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = () => {
    const values = { ...formVal, ...fileInputs }
    SetErrors(validateForm(values))
  }

  // validate form 
  const validateForm = (values: Record<string, any>) => {
    const err: Record<string, string> = {};

    userProfile.fields.forEach(field => {
      const value = values[field.name];

      // Check required fields
      if (field?.validation?.required && !value) {
        err[field.name] = `${field.label} is required.`;
        return;
      }

      // Check validation rules
      if (field.validation) {
        // Min/Max Length or Value
        if (field.validation.min && value.length < field.validation.min) {
          err[field.name] = `${field.label} must have at least ${field.validation.min} characters.`;
        } else if (field.validation.max && value.length > field.validation.max) {
          err[field.name] = `${field.label} must not exceed ${field.validation.max} characters.`;
        }

        if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
          err[field.name] = `${field.label} is not valid.`;
        }

        // File validation 
        if (field.type === 'file') {
          const file = fileInputs[field.name];
          if (file) {
            // Max size validation 
            if (field.validation.max && file.size > field.validation.max * 1024 * 1024) {
              err[field.name] = `${field.label} must not exceed ${field.validation.max} MB.`;
            }
          }
        }


      }
    });

    return err;
  };


  return (
    <div className='container mx-auto my-20 
    '>
      <header className=' text-2xl  md:text-4xl  lg:text-6xl text-bold  md:text-extrabold'>{userProfile.title}</header>
      <Form
        Schema={userProfile.fields}
        formVal={formVal}
        fileInputs={fileInputs}
        updateFormValue={updateFormValue}
        updateFileInput={updateFileInput}
        onSubmit={handleSubmit}
        errors={errors}

      />
    </div>
  )
}

export default App
