import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import AddTask from './Components/AddTask/AddTask'
import EditTask from './Components/EditTask/EditTask'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/add-task' component={AddTask} />
        <Route path='/edit/:task_id' component={AddTask} />
    </Switch>
)