import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages';
import Header from './components/ui/Header/Header';

const router = createBrowserRouter([
	{
		element: (
			<>
				<Header />
				<Outlet />
			</>
		),
		children: [{ path: '/', element: <Landing /> }],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
