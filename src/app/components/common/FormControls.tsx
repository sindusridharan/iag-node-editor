import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}

export const FormField = React.memo<FormFieldProps>(function FormField({
  label,
  children,
  htmlFor,
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
});

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

export const TextInput = React.memo<TextInputProps>(function TextInput({
  label,
  id,
  ...props
}) {
  return (
    <FormField label={label} htmlFor={id}>
      <input
        id={id}
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </FormField>
  );
});

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id?: string;
}

export const TextArea = React.memo<TextAreaProps>(function TextArea({
  label,
  id,
  ...props
}) {
  return (
    <FormField label={label} htmlFor={id}>
      <textarea
        id={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </FormField>
  );
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = React.memo<SelectProps>(function Select({
  label,
  id,
  options,
  placeholder = "Select...",
  ...props
}) {
  return (
    <FormField label={label} htmlFor={id}>
      <select
        id={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
});

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

export const NumberInput = React.memo<NumberInputProps>(function NumberInput({
  label,
  id,
  ...props
}) {
  return (
    <FormField label={label} htmlFor={id}>
      <input
        id={id}
        type="number"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </FormField>
  );
});
