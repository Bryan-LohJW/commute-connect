import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Landing, Profile } from './pages';
import { Overlay } from './components';
import { store } from './store';

const router = createBrowserRouter([
	{
		element: <Overlay />,
		children: [
			{ path: '/', element: <Landing /> },
			{ path: '/profile', element: <Profile /> },
		],
	},
]);

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
