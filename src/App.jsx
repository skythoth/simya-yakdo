// 루트 컴포넌트 - 라우터를 감싸는 최상위 컴포넌트
import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-main">
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
