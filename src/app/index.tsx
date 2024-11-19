import { useState } from 'react';
import dynamic from 'next/dynamic';
import FormGenerator from '../components/FormGenerator';

// Dynamically import the JSON editor (react-json-editor-ajrm)
const JSONEditor = dynamic(() => import('react-json-editor-ajrm'), { ssr: false });

// Import the locale for JSON editor
import locale from 'react-json-editor-ajrm/locale/en';

const initialSchema = {
  formTitle: 'Project Requirements Survey',
  formDescription: 'Please fill out this survey about your project needs',
  fields: [
    { id: 'name', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your full name' },
    { id: 'email', type: 'email', label: 'Email Address', required: true, placeholder: 'you@example.com' },
    {
      id: 'companySize',
      type: 'select',
      label: 'Company Size',
      required: true,
      options: [
        { value: '1-50', label: '1-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-1000', label: '201-1000 employees' },
        { value: '1000+', label: '1000+ employees' },
      ],
    },
    {
      id: 'industry',
      type: 'radio',
      label: 'Industry',
      required: true,
      options: [
        { value: 'tech', label: 'Technology' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance' },
        { value: 'retail', label: 'Retail' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'timeline',
      type: 'select',
      label: 'Project Timeline',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate (within 1 month)' },
        { value: 'short', label: 'Short-term (1-3 months)' },
        { value: 'medium', label: 'Medium-term (3-6 months)' },
        { value: 'long', label: 'Long-term (6+ months)' },
      ],
    },
    {
      id: 'comments',
      type: 'textarea',
      label: 'Additional Comments',
      placeholder: 'Any other details you\'d like to share...',
    },
  ],
};

export default function Home() {
  const [schema, setSchema] = useState(initialSchema);

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 p-6">
      {/* JSON Editor */}
      <div className="w-full md:w-1/2">
        <JSONEditor
          placeholder={schema}
          locale={locale} // Ensure locale is passed
          onChange={(e: { jsObject: any }) => setSchema(e.jsObject || schema)}
        />
      </div>
      {/* Form Preview */}
      <div className="w-full md:w-1/2">
        <FormGenerator schema={schema} />
      </div>
    </div>
  );
}
