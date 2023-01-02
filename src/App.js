import './App.css';
import Layout from "./component/Layout/Layout.js";
import TodoList from "./component/TodoList/TodoList.js";

function App() {
  return (
    <div className="App">
      <Layout>
        <TodoList />
      </Layout>
    </div>
  );
}

export default App;
