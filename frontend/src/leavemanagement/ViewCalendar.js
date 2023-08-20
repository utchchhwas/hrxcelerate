import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Breadcrumb,Table, Divider, Popconfirm, Icon } from 'antd';


class ViewCalendar extends React.Component {

  constructor() {
    super();
    this.state ={
        Projectdata:[],
    }
  }
  componentDidMount(){
    /*axios.get('http://localhost:5000/api/projects').then(res =>
    {
      this.setState({
        Projectdata: res.data,
    })
    });*/
  }

  
  
  render() {
    



  return (
    <React.Fragment>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
              <Breadcrumb.Item>View Calendar</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
           
           

            </div>
          
            </React.Fragment>
  );
}
}

export default ViewCalendar;
