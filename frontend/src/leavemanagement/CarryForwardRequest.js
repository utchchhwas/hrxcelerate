import React from 'react';
import {Breadcrumb,Table, Divider, Popconfirm, Icon } from 'antd';


class CarryForwardRequest extends React.Component {

  render() {
    const columns = [
      {
        title: 'Employee ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'No Of Days',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="javascript:;">{text}</a>,
      },
    ];

    const data =[

    ];
    
  return (
    <React.Fragment>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
              <Breadcrumb.Item>Carry Forward Request</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Table columns={columns} dataSource={data} />
            </div>
          
            </React.Fragment>
  );
}
}

export default CarryForwardRequest;
