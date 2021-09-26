import classNames from 'classnames'
import { Field as FormikField, Form as FormikForm, Formik } from 'formik'
import { createContext } from 'react'

export const FormContext = createContext()

export const Form = ({
  children,
  className,
  id,
  validationSchema,
  ...props
}) => {
  return (
    <FormContext.Provider value={{ id, validationSchema }}>
      <Formik {...props} validationSchema={validationSchema}>
        {({ handleSubmit, ...props }) => {
          return (
            <FormikForm className={className} onSubmit={handleSubmit}>
              {children(props)}
            </FormikForm>
          )
        }}
      </Formik>
    </FormContext.Provider>
  )
}

export const Input = ({ className, value, type, ...props }) => {
  return (
    <input
      type={type}
      value={value || ''}
      className={classNames('border rounded p-1', className)}
      {...props}
    />
  )
}

export const Field = ({
  name,
  type = 'text',
  className,
  control,
  hideLabel,
  inline,
  trim,
  ...props
}) => {
  const Control = control || Input

  return (
    <FormikField name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form

        const handleValueChange = (value) => {
          setFieldValue(name, value)
        }

        return (
          <div className={classNames(className, { inline: inline })}>
            <div>{!hideLabel && name}</div>

            <Control
              type={type}
              onValueChange={handleValueChange}
              {...field}
              {...props}
            />
          </div>
        )
      }}
    </FormikField>
  )
}
