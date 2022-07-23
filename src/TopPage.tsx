import { useNavigate } from "solid-app-router";

import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Grid from "@suid/material/Grid"

import "./TrailerPage.css";

const TopPage = () => {
	const navigate = useNavigate();
	const title = <img 
		class="title-gradient" 
		width="auto" 
		src="https://fontmeme.com/permalink/220723/6ad2b954ca7c28c02ab3625831fb8da4.png" 
		alt="font-stranger-things" 
	/>;

	const button = (text: string, link: string) => {
		return (
			<Button 
				className="neonText"
				sx={{color: "#fff", "&:hover": {backgroundColor: "none"}}}
				size="large"
				onClick={()=>navigate(link, {replace: false})}
			>{text}</Button>
		)
	}

	return (
		<>
			<Box
				sx={{
					width: "100%",
					height: "100vh",
					backgroundColor: 'black',
				}}
			>
				<Grid container height="90vh" justifyContent="center" alignItems="center">
					<Grid container width="500" height="50vh" justifyContent="center" alignItems="center">
						<Grid container item xs={12} md={12} justifyContent="center">
							{title}
						</Grid>
						<Grid container item xs={5} md={5} justifyContent="center">
							{button("random", "/theater/random")}
						</Grid>
						<Grid container item xs={2} md={2} justifyContent="center">
							{button("now", "/theater/now")}
						</Grid>
						<Grid container item xs={5} md={5} justifyContent="center">
							{button("coming", "/theater/coming")}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default TopPage;