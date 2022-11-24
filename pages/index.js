import React from "react"
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu/";
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset />
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
    margin-top: 50px;
    display: flex;
    align-items: center;
    widht: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
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
          < section >
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => { return video.title.includes(searchValue) }).map((video) => {
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
    </StyledTimeline>
  )
}

