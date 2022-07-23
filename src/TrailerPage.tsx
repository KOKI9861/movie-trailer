import { createSignal, createEffect, Switch, Match, createResource } from 'solid-js';
import { useNavigate, useParams } from 'solid-app-router';
import YouTubePlayer from 'youtube-player';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

import Button from "@suid/material/Button";
import IconButton from "@suid/material/IconButton";
import Grid from "@suid/material/Grid"
import Box from "@suid/material/Box";
import CircularProgress from '@suid/material/CircularProgress';
import PlayArrowIcon from '@suid/icons-material/PlayArrow';
import PauseIcon from '@suid/icons-material/Pause';

import './TrailerPage.css';

const URL = "https://script.google.com/macros/s/AKfycbz6AnZ_3nz7tzYGpFyMf5d6Xu-Jj8p2UuwbkbVQu6iZ4FaXIXAdVKIfywrIktp13OcS4w/exec";

const TrailerPage = () => {
	const params = useParams();
	const [method] = createResource(() => params.method);
	const navigate = useNavigate();
	
	const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));
	const getTrailerUrl = async () => 
  		(await fetch(`${URL}?method=${method()}`)).json();

	const [player, setPlayer] = createSignal<ReturnType<typeof YouTubePlayer> | null>(null);
	const [playing, setPlaying] = createSignal(false);
	const [filmarkLink, setFilmarkLink] = createSignal('https://filmarks.com/');
	const [loading, setLoading] = createSignal(true);

	const createPlayer = (videoId: string) => {
		const player = YouTubePlayer('player', {
			videoId: videoId,
			playerVars: {
				controls: 0,
			}
		});

		player.on('stateChange', (event) => {
			// event.data
			if(event.data === PlayerStates.ENDED) {
				nextTrailer();
			}else if(event.data === PlayerStates.PLAYING) {
				setPlaying(true);
			}else if(event.data === PlayerStates.PAUSED) {
				setPlaying(false);
			}
		});

		setPlayer(player);
		setLoading(false);
	}

	createEffect(() => {
		createPlayer("89U5Sva2qdc");
	})
	
	const nextTrailer = () => {
		player()?.destroy();
		setPlaying(false);
		setLoading(true);
		
		getTrailerUrl()
			.then(async (res) => {
				setFilmarkLink(res.film[0].filmarks);
				const id = res.film[0].link.match(/.*v=(.*)/)[1];
				createPlayer(id);
				await sleep(1000);
				player()?.playVideo();
			});
	}

	const handlePlayButton = () => {
		if(playing()) {
			player()?.pauseVideo();
		}else {
			player()?.playVideo();
		}
	}	

	return(
		<>
			<Box
				sx={{
					width: "100%",
					height: "100vh",
					backgroundColor: 'black',
				}}
			>

				<Grid container height="90vh" justifyContent="center" alignItems="center">
					<Grid container item xs={12} md={12} justifyContent="center">
						<div id='player' style={{width: '90%', height: "80vh"}}></div>
					</Grid>

					<Switch fallback={
						<Grid container item xs={12} md={12} justifyContent="center">
							<CircularProgress style={{color: "#c7e6ea"}}/>
						</Grid>
					}>
						<Match when={!loading()}>

							<Grid container item xs={4} md={4} justifyContent="center" alignItems="center">
								<Button className='neonText2' style={{color: "#ffffff"}} onClick={() => {window.open(filmarkLink(), '_blank');}} size="large">Filmarks</Button>
							</Grid>

							<Grid container item xs={4} md={4} justifyContent="center" alignItems="center">
								<IconButton style={{color: "#c7e6ea"}} onClick={handlePlayButton}>
									<Switch fallback={<PlayArrowIcon fontSize='large'/>}>
										<Match when={playing()}>
											<PauseIcon fontSize='large'/>
										</Match>
									</Switch>
								</IconButton>
							</Grid>
							
							<Grid container item xs={4} md={4} justifyContent="center" alignItems="center">
								<Button className='neonText2' style={{color: "#ffffff"}} onClick={nextTrailer} size="large">Next</Button>
							</Grid>

						</Match>
					</Switch>

				</Grid>

				<Grid container height="10vh" justifyContent="center" alignItems="center">
					<Grid container item xs={12} md={12} justifyContent="center">
						<Button style={{color: "#555555"}} onClick={()=>navigate("/", {replace: false})}>TRAILER CINEMA</Button>
					</Grid>
				</Grid>

			</Box>
		</>
	)
}

export default TrailerPage;