import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Toaster } from 'sonner';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Nunito', sans-serif",
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes />
        <Toaster richColors position='top-center' />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
