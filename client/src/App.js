import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.min.css';
import { BASE_URL } from './utils/constants';
import Home from './components/pages/Home';
import Details from './components/pages/Details';
import Title from "./components/layout/Title";
import { Divider } from "antd";

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
      <Title text="PEOPLE AND THEIR CARS" />
      <Divider />
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Detail Page */}
          <Route path="/people/:personId" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  </ApolloProvider>
)

export default App;
