import { Button, Dropdown, Menu, Spin } from 'antd';
import React from 'react';

import './style.scss';
import { USER } from './user/USER';
import ReactToPrint from 'react-to-print';
import { DownOutlined } from '@ant-design/icons';

type Props = {
  isLoading?: boolean;
  modelList: string[];
  listScreen?: boolean;
  data: any;
};

type States = {
  model: string;
};

export class PrintButton extends React.Component<Props, States> {
  constructor(props) {
    super(props);

    const { modelList } = props;

    this.state = { model: modelList[0] };
  }

  componentRef: any;

  render() {
    const { isLoading, data, modelList, listScreen } = this.props;
    const { model } = this.state;

    let Form;
    switch (model) {
      case 'Danh sách nhân viên':
        Form = USER;
        break;

      default:
        Form = USER;
        break;
    }

    // if (listScreen) {
    //   Form = PRINTFLIST;
    // }

    const menu = (
      <Menu>
        {modelList.map((item, index) => (
          <Menu.Item key={index}>
            <ReactToPrint
              trigger={() => (
                <Button
                  type="primary"
                  style={{ width: 150 }}
                  onMouseEnter={() => this.setState({ model: item })}
                >
                  {item}
                </Button>
              )}
              content={() => this.componentRef}
            />
          </Menu.Item>
        ))}
      </Menu>
    );

    if (isLoading) {
      return <Spin />;
    }

    return (
      <div className="btn-print">
        {!listScreen ? (
          <>
            <Dropdown.Button
              type="primary"
              className="btn-trigger-print"
              overlay={menu}
              placement="bottomCenter"
              icon={<DownOutlined />}
            >
              In
            </Dropdown.Button>
          </>
        ) : (
          <>
            {modelList.map((item, index) => (
              <div style={{ marginTop: 5 }} key={index}>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      type="primary"
                      style={{ width: 150 }}
                      onMouseEnter={() => this.setState({ model: item })}
                    >
                      {item}
                    </Button>
                  )}
                  content={() => this.componentRef}
                />
              </div>
            ))}
          </>
        )}

        <Form ref={(el) => (this.componentRef = el)} model={model} data={data} />
      </div>
    );
  }
}

export default PrintButton;
