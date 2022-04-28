import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { AddNewPenyakitPage } from './pages/AddNewPenyakitPage'
import { TestDNAPage } from './pages/TestDNAPage'
import { HistoryPage } from './pages/HistoryPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/history" component={HistoryPage} exact/>
          <Route path="/addpenyakit" component={AddNewPenyakitPage} exact/>
          <Route path="/" component={TestDNAPage} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
