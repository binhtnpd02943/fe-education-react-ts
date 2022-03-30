
import { ComponentType } from '@/fe-helper/core/model/column.model'
import { Checkbox, DatePicker, Form, Input, InputNumber, Mentions, Select } from 'antd'
import locale from 'antd/lib/date-picker/locale/vi_VN'
import 'moment/locale/vi'
import React, { FC, useContext, useEffect } from 'react'

import NgxAutocompleteComponent from '../../../ngx-autocomplete'
import { EditableCellProps } from '../../type'
import { EditableContext } from '../row'


/**
 * Edit table cell component
 * @param title
 * @param editable
 * @param children
 * @param dataIndex
 * @param record
 * @param handleSave
 * @param config
 * @param rowIndex
 * @param suffix
 * @param isValidate
 * @param restProps
 * @constructor
 */
const EditableCell: FC<EditableCellProps> = ({
                                                 title,
                                                 editable,
                                                 children,
                                                 dataIndex,
                                                 record,
                                                 handleSave,
                                                 config,
                                                 rowIndex,
                                                 suffix,
                                                 isValidate,
                                                 ...restProps
                                             }: EditableCellProps,
) => {
    const form = useContext(EditableContext)!

    /**
     * Execute validate form when parent component click submit and display error
     */
    const executeValidateFormAndGetAllFieldValue = async () => {
        if (isValidate) {
            return await form.validateFields([dataIndex[1]])
        }
    }

    /**
     * Save value of input, combobox, checkbox, textarea... when onChange value
     */
    const save = async () => {
        await executeValidateFormAndGetAllFieldValue()
        handleSave({ [dataIndex[1]]: form.getFieldValue(dataIndex[1]) }, rowIndex, dataIndex)
    }

    /**
     * Save value onChange autocomplete
     * @param value
     * @param option
     */
    const onChangeAutoComplete = async (value: any, option) => {
        handleSave({ [dataIndex[1]]: option?.key }, rowIndex, dataIndex)
    }

    /**
     * Generate element from config type
     */
    const generateFormItemFromConfig = () => {
        let result
        let childNode = children
        if (config) {
            const disable = (!config?.disable) ? false : config?.disable

            switch (config?.type?.toString()) {
                case ComponentType.Input:
                    result = <Input disabled={disable} onChange={save}/>
                    break

                case ComponentType.Number:
                    result = <InputNumber disabled={disable} onChange={save}/>
                    break

                case ComponentType.Combobox:
                    result = <Select onChange={save} {...config?.selectConfig}
                                     disabled={disable}>
                        {config?.data && config?.data?.length > 0 ? config.data?.map((el, index) => {
                            if (config && config?.bindValue && config?.bindLabel) {
                                return <Mentions.Option key={index.toString()} value={el[config.bindValue]}>
                                    {el[config.bindLabel]}
                                </Mentions.Option>
                            }
                        }) : null}

                    </Select>
                    break

                case ComponentType.CheckBox:
                    result = <Checkbox onChange={save} disabled={disable}>
                    </Checkbox>
                    break

                case ComponentType.DatePicker:
                    result = <DatePicker onChange={save} disabled={disable}
                                         locale={locale} placeholder={''} format={'DD/MM/YYYY'}/>
                    break

                case ComponentType.Custom:
                    result = config.component
                    break

                case ComponentType.Autocomplete:
                    result = (
                        <NgxAutocompleteComponent autocompleteConfig={config?.autocompleteConfig}
                                                  onChangeAutoComplete={(value, option) => onChangeAutoComplete(value, option)}
                                                  bindLabel={config?.bindLabel} bindValue={config?.bindValue}
                                                  value={record[dataIndex[1]]}
                                                  data={config?.data} disable={disable}>
                        </NgxAutocompleteComponent>
                    )
                    break

                default:
                    result = <Input disabled={disable} onChange={save}/>
                    break
            }
        }
        if (editable) {
            config = config || {}
            childNode = config?.type !== ComponentType.CheckBox ?
                <Form.Item style={{ margin: 0 }} name={dataIndex[1]}
                           validateTrigger={'onSubmit'}
                           rules={config?.validateRules}
                           initialValue={record[dataIndex[1]]}
                           shouldUpdate={true}>
                    {result}
                </Form.Item> :

                <Form.Item
                    validateTrigger={'onSubmit'}
                    rules={config?.validateRules}
                    style={{ margin: 0 }}
                    name={dataIndex[1]}
                    valuePropName="checked">
                    {result}
                </Form.Item>
        }
        return childNode
    }

    useEffect(() => {
        if (dataIndex && dataIndex[1]) {
            form.setFieldsValue({ [dataIndex[1]]: record[dataIndex[1]] })
        }
    })

    return <td  {...restProps} >{generateFormItemFromConfig()}</td>
}

export default EditableCell