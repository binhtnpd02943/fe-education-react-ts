import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Col, Input, Row, Tooltip, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Component } from 'react';
import './USER.scss'

type Props = {
  data: any;
};

export class USER extends Component<Props> {
  render() {
    // const [data] = this.props.data;

    const columns: ColumnsType<any> = [
      {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        width: '150px',

        render: (fullName: string) => (
          <Tooltip placement="topLeft" title={fullName}>
            {fullName}
          </Tooltip>
        ),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (gender: boolean) =>
          gender ? (
            <span>
              <ManOutlined style={{ color: '#02a3fe' }} /> Male
            </span>
          ) : (
            <span>
              <WomanOutlined style={{ color: '#ec49a6' }} /> Female
            </span>
          ),
        width: '120px',
      },
      {
        title: 'Age',
        dataIndex: 'birthday',
        key: 'age',
        align: 'right' as const,
        render: (value: string) => moment().year() - moment(value).year(),
        width: '130px',
      },
      {
        title: 'Account Mail',
        dataIndex: 'accountEmail',
        key: 'accountEmail',
        width: '130px',
        render: (accountEmail: string) => (
          <Tooltip placement="topLeft" title={accountEmail}>
            {accountEmail}
          </Tooltip>
        ),
      },
      {
        title: 'Roll',
        dataIndex: ['role', 'id'],
        key: 'roll',
        render: (rollId: number) => {
          const value = rollId === 2 ? 'Student' : 'Teacher';
          const color = rollId === 2 ? '#1d39c4' : '#389e0d';
          return <p style={{ color: color }}>{value}</p>;
        },
        width: '130px',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        align: 'right' as const,
        width: '150px',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '150px',
        render: (address: string) => (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        ),
      },
    ];
    return (
      <div className="print-source doc">
        <div id="voucher-container">
          <Row className="info-row">
            <Col span="16" className="info-customer-col">
              <Row>
                {/* TODO */}
                <Col span="18" className="info-customer-col">
                  C??ng ty FPT Software ???? N???ng
                </Col>
              </Row>
              <Row>
                {/* TODO */}
                <Col span="18">Nam K??? Kh???i Ngh??a, H??a H???i, Ng?? H??nh S??n, ???? N???ng</Col>
              </Row>
            </Col>
          </Row>
          <Row className="title-row">
            <Col span="12" className="title" offset="6">
              <h1>Th??ng tin nh??n vi??n</h1>
            </Col>
          </Row>
          <Row className="info-row">
            <Col span="16" className="info-customer-col">
              <Row>
                <Col span="6">T??n</Col>
                <Col span="18">
                  :
                  .........................................................................................
                </Col>
              </Row>
              <Row>
                <Col span="6">?????a ch???</Col>
                <Col span="18">
                  :
                  .........................................................................................
                </Col>
              </Row>
              <Row>
                <Col span="6">Di???n gi???i</Col>
                <Col span="18">: Danh s??ch nh??n vi??n ?????t th??nh t??ch t???t theo th??ng </Col>
              </Row>
            </Col>
            <Col span="8">
              <Row>
                <Col span="6">S???</Col>
                <Col span="18">: </Col>
              </Row>
              <Row>
                <Col span="6">Ng??y</Col>
                <Col span="18">: </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Table
           
            columns={columns}
            dataSource={this.props.data}
            pagination={false}
            bordered
          />
          <br />
          <Row className="info-row">
            <Col span="5" className="info-customer-col">
              Th??nh ti???n b???ng ch??? :{' '}
            </Col>
            <Col span="19" className="total-money-word"></Col>
          </Row>
          <Row className="info-row">
            <Col span="2" className="info-customer-col">
              Ghi ch??
            </Col>
            <Col span="22" className="info-customer-col">
              :
              ........................................................................................................................................................................................................................................................................
            </Col>
          </Row>
          <br />
          <Row className="signature-row">
            <Col span="12" className="signature-container">
              <p className="role">K??? to??n tr?????ng</p>
              <p className="guide">(K??, H??? t??n)</p>
              <p className="signature-box"></p>
              {/* TODO */}
              <p className="name">V?? Anh Ch????ng</p>
            </Col>
            <Col span="12" className="signature-container">
              <p className="role">Gi??m ?????c</p>
              <p className="guide">(K??, H??? t??n, ????ng d???u)</p>
              <p className="signature-box"></p>
              {/* TODO */}
              <p className="name">B??i H???ng Phong</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
