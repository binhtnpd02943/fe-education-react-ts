import { Form, FormInstance } from 'antd'
import React, { FC, useEffect } from 'react'
import { EditableRowProps, EditableStateModel } from '../../type'

// Edit table context
export const EditableContext = React.createContext<FormInstance<any> | null>(null)

/**
 *  Edit table row with wrap form provider
 * @param index
 * @param isValidate
 * @param setFieldsError
 * @param props
 * @constructor
 */
const EditableRow: FC<EditableRowProps> = ({ index, isValidate, setFieldsError, ...props }) => {
  const [form] = Form.useForm()

  const executeValidate = () => {
    if (isValidate) {
      form.validateFields().finally(() => {
        const errorForm = form.getFieldsError()
        const extractError = errorForm.filter((el) => el.errors.length > 0)
        const errorOutputModel: EditableStateModel = {
          isValid: extractError.length <= 0,
          errors: extractError,
        }
        setFieldsError(errorOutputModel)
      })
    }
  }

  const validateFormWhenOnValuesChange = (value) => {
    const fieldName = Object.keys(value)
    if (fieldName && fieldName[0]) {
      executeValidate()
    }
  }

  useEffect(executeValidate, [isValidate])
  const rowProps = { ...props }
  // record is an invalid properties
  delete rowProps['record']
  return (
    <Form.Provider>
      <Form form={form} onValuesChange={validateFormWhenOnValuesChange} name={props['data-row-key']} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    </Form.Provider>
  )
}

export default EditableRow
