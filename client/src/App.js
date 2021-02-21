import React, { Component } from 'react';
import './App.css';
//Redux components
import {sendData , getData} from './actions/dashboardAction'
import {connect } from 'react-redux'
import {bindActionCreators} from 'redux'



class App extends Component {
  constructor(props){
    super();
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.callApi = this.callApi.bind(this);
  }
  
  
  componentDidMount() {
    this.callApi();
  }
  
  callApi = () => {    
    this.props.getData('/api/hello');
  };
  
  handleSubmit = () => {
    window.location.reload(false);

    this.props.sendData('/api/data',{ post: this.state.post });
  };



render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Serverside Notebooks
          </p>
        </header>
        <div class="row">

        <div class="leftcolumn">

    <div class="card">
    <div class="card"
  dangerouslySetInnerHTML={{
    __html: this.props.getDataFromBackend.express
  }}></div> <br></br> </div>
          <div class="card">
    <button onClick={this.handleSubmit}>New Notebook</button>

 </div>

  </div>




  <div class="rightcolumn" >
    
  <div class="card">
  <form onSubmit={this.handleSubmit}>
  <textarea type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })} rows="30" cols="170">
  </textarea>        <br></br>
       

      </form>
      </div>
  </div>
</div>
        <div>
        
        </div>
        <p style={{color : 'blue'}}><b>{this.props.dataFromBackend.data}</b></p>
      </div>
    );
  }
}
//React Redux connecting code
function mapStateToProps(state){
  return {
   dataFromBackend : state.dashboardReducer.dataFromBackend,
   getDataFromBackend : state.dashboardReducer.getDataFromBackend
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  sendData,
  getData
},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);



