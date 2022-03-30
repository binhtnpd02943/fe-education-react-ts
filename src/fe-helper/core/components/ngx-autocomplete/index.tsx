import { SortAscendingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { AutoComplete, Col, Input, Row, SelectProps } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AutocompleteConfig } from '@/fe-helper/core/model/column.model';

export type Props = {
  autocompleteConfig?: AutocompleteConfig;
  onChangeAutoComplete?: any;
  bindLabel?: string;
  bindValue?: string;
  value?: any;
  data: any;
  disable?: boolean;
};

export const NgxAutocompleteComponent: FC<Props> = ({
                                                        autocompleteConfig,
                                                        onChangeAutoComplete,
                                                        bindLabel,
                                                        bindValue,
                                                        value,
                                                        data,
                                                        disable,
                                                        }) => {
  const renderTitle = () => {
    const titles = autocompleteConfig?.titles;
    const number = titles?.length ? titles.length : 1;
    const result: any = [];
    titles?.forEach((el, index) => {
      result.push(
        <Col title={el && el.toString()} key={index} className="text-header" style={{ width: `${100 / number}%` }}>
        <SortAscendingOutlined /> {el && el.toString()}
      </Col>
      )
    });
    return <Row className={'auto-complete-content'}>{result}</Row>;
  };

  const renderOption = (listData: any) => {
    const dataBinding = autocompleteConfig?.dataBinding;
    const item: any[] = [];
    listData?.forEach((el) => {
      const result: any = [];
      dataBinding?.forEach((elementBind, idx) => {
        result.push(
          <Col key={idx} className={'text-option-autocomplete'} style={{ width: `${100 / dataBinding.length}%` }}>
            {el[`${elementBind}`]}
          </Col>
        );
      });
      item.push({
        key: el[`${bindValue}`],
        value: el[`${bindLabel}`],
        label: <Row>{result}</Row>,
      });
    });
    return item;
  };

  const [options, SetOptions] = useState<SelectProps<any>['options']>([]);

  const onSearch = (searchText) => {
    const result = data?.filter((obj) =>
      Object.values(obj).some((value1: any) =>
        value1.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    SetOptions([
      {
        label: renderTitle(),
        options: renderOption(result),
      },
    ]);
  };

  useEffect(() => {
    if (options?.length === 0 && data?.length > 0) {
      SetOptions([
        {
          label: renderTitle(),
          options: renderOption(data),
        },
      ]);
    }
  });

  const findPropBindingOfData = (bindLabel: any, bindValue, value, data) => {
    const findObject = data?.find((el) => el[bindValue] === value);
    return findObject && findObject[bindLabel];
  };

  return (
    <AutoComplete
      value={findPropBindingOfData(bindLabel, bindValue, value, data)}
      disabled={disable}
      onSearch={onSearch}
      dropdownClassName={autocompleteConfig?.dropdownClassName}
      onChange={onChangeAutoComplete}
      dropdownMatchSelectWidth={autocompleteConfig?.dropdownMatchSelectWidth}
      style={autocompleteConfig?.style}
      options={options}
    >
      <Input suffix={<UnorderedListOutlined />} />
    </AutoComplete>
  );
};

NgxAutocompleteComponent.propTypes = {
  autocompleteConfig: PropTypes.any,
  onChangeAutoComplete: PropTypes.any,
  bindLabel: PropTypes.string,
  bindValue: PropTypes.string,
  value: PropTypes.any,
  data: PropTypes.any,
  disable: PropTypes.bool,
};
export default NgxAutocompleteComponent;
