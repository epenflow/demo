import './base.css';

const Navbar = () => {
	return (
		<header className="header-container">
			<nav className="navbar">
				<section className="navbar-heading">
					<h1>Demo</h1>
				</section>
			</nav>
		</header>
	);
};
const resources = {
	select: {
		default: '',
		options: [
			{
				label: 'Scroll Trigger',
				value: 'test',
			},
		] satisfies Array<{
			value: string;
			label: string;
		}>,
	},
};
export default Navbar;
