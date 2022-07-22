import { useNavigate } from "solid-app-router";

import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Grid from "@suid/material/Grid"

const TopPage = () => {
	const navigate = useNavigate();

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
					<Grid container item xs={5} md={5} justifyContent="center">
						<Button 
							variant="outlined"
							size="large"
							onClick={()=>navigate("/theater/random", {replace: false})}
						>random</Button>
					</Grid>
					<Grid container item xs={2} md={2} justifyContent="center">
						<Button 
							variant="outlined"
							size="large"
							onClick={()=>navigate("/theater/now", {replace: false})}
						>now</Button>
					</Grid>
					<Grid container item xs={5} md={5} justifyContent="center">
						<Button 
							variant="outlined"
							size="large"
							onClick={()=>navigate("/theater/coming", {replace: false})}
						>coming</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default TopPage;