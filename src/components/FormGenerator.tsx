import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface Schema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface FormProps {
  schema: Schema;
}

const FormGenerator: React.FC<FormProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-2">{schema.formTitle}</h1>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="font-medium mb-1">
              {field.label}
            </label>
            {field.type === 'text' || field.type === 'email' ? (
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required ? 'This field is required' : undefined,
                  pattern: field.validation
                    ? {
                        value: new RegExp(field.validation.pattern),
                        message: field.validation.message,
                      }
                    : undefined,
                })}
                className="border rounded px-3 py-2 mt-1"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                {...register(field.id, {
                  required: field.required ? 'This field is required' : undefined,
                })}
                className="border rounded px-3 py-2 mt-1"
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'radio' ? (
              <div className="flex flex-col space-y-2 mt-1">
                {field.options?.map((option) => (
                  <label key={option.value} className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      value={option.value}
                      {...register(field.id, {
                        required: field.required ? 'This field is required' : undefined,
                      })}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required ? 'This field is required' : undefined,
                })}
                className="border rounded px-3 py-2 mt-1"
              />
            )}
            {/* Error Handling */}
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {errors[field.id]?.message as string}
              </span>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
