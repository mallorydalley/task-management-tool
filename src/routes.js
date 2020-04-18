import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import AddTask from './Components/AddTask/AddTask'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/auth' component={Auth} />
        <Route path='/dashboard/' component={Dashboard} />
        <Route path='/add-task' component={AddTask} />
        <Route path='/edit/:task_id' component={AddTask} />
    </Switch>
)