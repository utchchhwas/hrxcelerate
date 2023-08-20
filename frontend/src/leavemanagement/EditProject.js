import React from 'react';
import axios from 'axios';
import {Content, Form, Breadcrumb, Input, Col, Row, Button} from 'antd';

class EditProject extends React.Component {

  constructor(props){
    super(props);

    this.state={
      projectid: {value: ''},
      projectname: {value: ''},
      abbreviation: {value: ''},
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.validateProjectnameAvailability = this.validateProjectnameAvailability.bind(this);
  this.validateAbbreviationAvailability = this.validateAbbreviationAvailability.bind(this);
  }
  
  handleSubmit(event){
    event.preventDefault();
    const projectData = {
        id: this.state.projectid.value,
        name: this.state.projectname.value,
        abbreviation: this.state.abbreviation.value,       
    };
    axios.post(`http://localhost:5000/api/update/projects/`+this.props.match.params.id, JSON.stringify(projectData),{
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    }).then(res => {
        console.log(res);
        console.log(res.data);
    });
  }

  handleProjectname(value){
console.log(value);
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/projects/'+this.props.match.params.id).then(res =>
    {
     
      this.setState({projectid : {value: res.data.id}});
      this.setState({projectname: {value: res.data.name}});
      this.setState({abbreviation: {value: res.data.abbreviation}})
    });
  }
  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            value: inputValue,
            ...validationFun(inputValue)
        }
    });
}
  render() {
  return (
  <React.Fragment>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Project</Breadcrumb.Item>
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Row>
      <Col span={12}>
      
            <Form.Item
            label="Project ID"
            layout='vertical'
          >
          <Input placeholder="Project ID" value={this.state.projectid.value} disabled />
          </Form.Item>

          <Form.Item
          hasFeedback
            label="Project Name"
            layout='vertical'
            validateStatus={this.state.projectname.validateStatus}
                            help={this.state.projectname.errorMsg}>
          
          <Input placeholder="Project Name"
          className={this.projectname}
          name='projectname'
          autoComplete="off"
          placeholder="A unique project name"
          value={this.state.projectname.value} 
          onBlur={this.validateProjectnameAvailability}
          onChange={(event) => this.handleInputChange(event, this.validateName)} />
          </Form.Item>

          <Form.Item
          hasFeedback
            label="Abbreviation"
            layout='vertical'
            validateStatus={this.state.abbreviation.validateStatus}
                            help={this.state.abbreviation.errorMsg}>
          
          <Input placeholder="Abbreviation"
          className={this.abbreviation}
          name='abbreviation'
          autoComplete="off"
          placeholder="Enter unique abbreviation name"
          value={this.state.abbreviation.value} 
          onBlur={this.validateAbbreviationAvailability}
          onChange={(event) => this.handleInputChange(event, this.validateName)} />
          </Form.Item>
          
          <Button type="primary" onClick={this.handleSubmit}>Create</Button>
          <Button>Clear</Button>
          </Col>
          <Col span={12}></Col>
    </Row>
            </div>
          
            </React.Fragment>
  );
}
validateName = (name) => {
  if (name.length < 3) {
      return {
          validateStatus: 'error',
          errorMsg: `Name is too short (Minimum 3 characters needed.)`
      }
  } else if (name.length > 45) {
      return {
          validationStatus: 'error',
          errorMsg: `Name is too long (Maximum 45 characters allowed.)`
      }
  } else {
      return {
          validateStatus: 'success',
          errorMsg: null,
      };
  }
}



  validateProjectnameAvailability() {
        // First check for client side errors in username
        const projectnameValue = this.state.projectname.value;
        const projectnameValidation = this.validateName(projectnameValue);

        if(projectnameValidation.validateStatus === 'error') {
            this.setState({
                projectname: {
                    value: projectnameValue,
                    ...projectnameValidation
                }
            });
            return;
        }

        this.setState({
            projectname: {
                value: projectnameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });
        console.log("getprojectname");
        console.log(projectnameValue);
 axios.get('http://localhost:5000/api/project/checkProjectnameAvailability?projectname='+projectnameValue)
        .then(response => {
          
            if(response.data.available){
                this.setState({
                    projectname: {
                        value: projectnameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    projectname: {
                        value: projectnameValue,
                        validateStatus: 'error',
                        errorMsg: 'This project name is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                projectname: {
                    value: projectnameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateAbbreviationAvailability() {
      // First check for client side errors in username
      const abbreviationValue = this.state.abbreviation.value;
      const abbreviationValidation = this.validateName(abbreviationValue);

      if(abbreviationValidation.validateStatus === 'error') {
        this.setState({
          abbreviation: {
            value: abbreviationValue,
            ...abbreviationValidation
          }
        });
        return;
      }

      this.setState({
        abbreviation: {
          value: abbreviationValue,
          validateStatus: 'validating',
          errorMsg: null
        }
      });
      console.log("getabbreviationname");
      console.log(abbreviationValue);
      axios.get('http://localhost:5000/api/project/checkAbbreviationAvailability?abbreviation=' + abbreviationValue)
        .then(response => {

          if (response.data.available) {
            this.setState({
              abbreviation: {
                value: abbreviationValue,
                validateStatus: 'success',
                errorMsg: null
              }
            });
          } else {
            this.setState({
              abbreviation: {
                value: abbreviationValue,
                validateStatus: 'error',
                errorMsg: 'This abbreviation is already taken'
              }
            });
          }
        }).catch(error => {
          // Marking validateStatus as success, Form will be recchecked at server
          this.setState({
            abbreviation: {
              value: abbreviationValue,
              validateStatus: 'success',
              errorMsg: null
            }
          });
        });
    }
}

export default EditProject;
