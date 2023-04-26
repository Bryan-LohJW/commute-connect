import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Landing } from './pages';
import { Overlay } from './components';

const router = createBrowserRouter([
	{
		element: <Overlay />,
		children: [{ path: '/', element: <Landing /> }],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
