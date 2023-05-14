import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Landing } from './pages';
import { Overlay } from './components';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
	{
		element: <Overlay />,
		children: [{ path: '/', element: <Landing /> }],
	},
]);

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<RouterProvider router={router} />;
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
