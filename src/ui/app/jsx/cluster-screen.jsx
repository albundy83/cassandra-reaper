//
//  Copyright 2017-2019 The Last Pickle Ltd
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

import React from "react";
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from "moment";
import ServerStatus from "jsx/server-status";
import Sidebar from "jsx/sidebar";
import ClusterForm from "jsx/cluster-form";
import ClusterList from "jsx/cluster-list";
import NavBar from "jsx/navbar";
import LoginForm from "jsx/login-form";
import {RowDeleteMixin, RowAbortMixin, StatusUpdateMixin, DeleteStatusMessageMixin, CFsListRender} from "jsx/mixin";

const ClusterScreen = CreateReactClass({
  mixins: [RowDeleteMixin, StatusUpdateMixin, RowAbortMixin],

  propTypes: {
    clusterNames: PropTypes.object.isRequired,
    deleteSubject: PropTypes.object.isRequired,
    deleteResult: PropTypes.object.isRequired,
    currentCluster: PropTypes.string.isRequired,
    addClusterSubject: PropTypes.object.isRequired,
    addClusterResult:  PropTypes.object.isRequired,
    loginSubject: PropTypes.object.isRequired,
    loginResult: PropTypes.object.isRequired,
    logoutSubject: PropTypes.object.isRequired,
    logoutResult: PropTypes.object.isRequired,
    switchTheme: PropTypes.func
  },

  getInitialState: function() {
    return {
        currentCluster:this.props.currentCluster=="undefined"?"all":this.props.currentCluster
    }
  },

  changeCurrentCluster : function(clusterName){
    this.setState({currentCluster: clusterName});
  },

  toggleTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  },

  render: function() {
  const navStyle = {
    marginBottom: 0
  };

  let content = 
    <div>
        <div className="col-lg-12">
            <ClusterForm clusterNames={this.props.clusterNames} currentCluster={this.state.currentCluster} addClusterSubject={this.props.addClusterSubject} addClusterResult={this.props.addClusterResult} > </ClusterForm>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <ClusterList clusterNames={this.props.clusterNames} currentCluster={this.state.currentCluster} deleteSubject={this.props.deleteSubject} deleteResult={this.props.deleteResult} > </ClusterList>
            </div>
        </div>
    </div> 

  return (
        <div>
          <nav className="navbar navbar-inverse navbar-static-top" role="navigation" style={navStyle}>
              <NavBar switchTheme={this.props.switchTheme}></NavBar>

              <Sidebar clusterNames={this.props.clusterNames} currentCluster={this.state.currentCluster} 
                  loginSubject={this.props.loginSubject} loginResult={this.props.loginResult}
                  logoutSubject={this.props.logoutSubject} logoutResult={this.props.logoutResult}> </Sidebar>
          </nav>

          <div id="page-wrapper">
              <div className="row">
                  <ServerStatus statusObservableTimer={this.props.statusObservableTimer}></ServerStatus>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <h1 className="page-header">Cluster</h1>
                  </div>
              </div>
              {content}
          </div>
        </div>
    );
  }

});



export default ClusterScreen;
