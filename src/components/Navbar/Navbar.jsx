import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar__content">
					<h1 className="title">Decentraliezd Application</h1>

					<ul>
						<li>
							<small>ACCOUNT NUMBER: </small>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
