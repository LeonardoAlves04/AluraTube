import React, { useEffect } from "react"
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu/";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";


function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    service
      .getAllVideos()
      .then((dados) => {
        const novasPlaylists = { ...playlists }
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = []
          }
          novasPlaylists[video.playlist].push(video);
        })
        setPlaylists(novasPlaylists);
      });
  }, []);

  return (
    <>
      <div >
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>Conteúdo</Timeline>
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info{
    display: flex;
    align-items: center;
    widht: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
background-color: blue;
background-image: url(${config.bg});
height: 280px;
background-repeat: no-repeat;
background-size: cover;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner />
      <section className="user-info">
        <a href="https://github.com/LeonardoAlves04"><img src={`https://github.com/${config.github}.png`} alt="profile picture"></img></a>
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          < section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section >
        )
      })}
      <h2>Aqui vai a seção de favorites</h2>
    </StyledTimeline>
  )
}

